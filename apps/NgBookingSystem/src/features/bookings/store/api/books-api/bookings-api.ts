import { createSelector } from "@ngrx/store";
import { apiSlice } from "apps/NgBookingSystem/src/features/api/api-slice";
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";

export const extendedBookingApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: builder => ({
            getBookings: builder.query<Booking[], void>(
                {
                    query: () => '/bookings',
                    transformResponse: (results: Booking[]) => {
                        return results.sort((a, b) => b.postedDate.localeCompare(a.postedDate))
                    },
                    providesTags: (result) => result ? [
                        { type: 'Bookings', id: "LIST" },
                        ...result.map(({ id }) => ({ type: 'Bookings' as const, id }))
                    ] : [{ type: 'Bookings', id: 'LIST' }]
                }),
            getBookingsByLocationId: builder.query<Booking[], string | undefined>(
                {
                    query: id => `/bookings/?bookingLocationId=${id}`,
                    providesTags: (result, error, id) => [
                        { type: 'Bookings', id }]
                }),
            getBookingById: builder.query<Booking | null, string | undefined>(
                {
                    query: id => `bookings/?id=${id}`,
                    transformResponse: (response: Booking[]) => {
                        if (response.length === 1) {
                            return response[0];
                        }
                        return null;
                    },
                    providesTags: (result, error, id) => [{
                        type: 'Bookings',
                        id
                    }]
                }),
            addNewBooking: builder.mutation<Booking, Partial<Booking>>(
                {
                    query: initialBooking => ({
                        url: '/bookings',
                        method: 'POST',
                        body: {
                            ...initialBooking,
                            postedDate: new Date().toISOString(),
                            reactions: {
                                thumbsUp: 0,
                                thumbsDown: 0
                            }
                        }
                    }),
                    invalidatesTags: ['Bookings', 'Locations']
                }),
            updateBooking: builder.mutation(
                {
                    query: initialBooking => ({
                        url: `/bookings/${initialBooking.id}`,
                        method: 'PUT',
                        body: {
                            ...initialBooking,
                            postedDate: new Date().toISOString()
                        }
                    }),
                    invalidatesTags: (results, error, arg) => [{
                        type: 'Bookings',
                        id: arg.id
                    }]
                }),
            deleteBooking: builder.mutation(
                {
                    query: (id) => ({
                        url: `/bookings/${id}`,
                        method: 'DELETE',
                        body: { id }
                    }),
                    invalidatesTags: (result, error, arg) => [{
                        type: 'Bookings',
                        id: arg.id
                    }]
                }),
            addReaction: builder.mutation(
                { // Optimistic update
                    query: ({ bookingId, reactions }) => ({
                        url: `bookings/${bookingId}`,
                        method: 'PATCH',
                        body: { reactions }
                    }),
                    invalidatesTags: ['Bookings'],
                    async onQueryStarted({ bookingId, reactions }, { dispatch, queryFulfilled }) {
                        // `updateQueryData` requires the endpoint name and cache key arguments,
                        // so it knows which piece of cache state to update
                        const patchResult = dispatch(
                            extendedBookingApiSlice.util.updateQueryData(
                                'getBookings', undefined, data => {
                                    // data is Immer-wrapped and can be "mutated" like in createSlice
                                    const booking = data.find(bk => bk.id === bookingId);
                                    if (booking) {booking.reactions = reactions}
                                })
                        )
                        try {
                            await queryFulfilled;
                        }
                        catch {
                            patchResult.undo();
                        }
                    }
                })
        })
    });

// From Api
export const {
    useGetBookingsQuery,
    useGetBookingsByLocationIdQuery,
    useGetBookingByIdQuery,
    useAddNewBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useAddReactionMutation
} = extendedBookingApiSlice;
// Query results
export const selectBookingsResults = extendedBookingApiSlice.endpoints.getBookings.select();
export const selectAllBookingsApi = createSelector(
    selectBookingsResults,
    state => state.data || []
)