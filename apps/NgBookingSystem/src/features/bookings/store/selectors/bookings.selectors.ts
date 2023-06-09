import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookingAdapter, BookingAdapterState } from "apps/NgBookingSystem/src/features/bookings/store/entity";
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";

import { bookingFeatureKey } from "../reducer/booking.reducer";

//export const selectBookingState = createFeatureSelector<BookingState>(bookingFeatureKey);
//export const selectAllBookings = createSelector(selectBookingState, (state: BookingState) =>
// state.bookings.slice().sort((a, b) => b.postedDate.localeCompare(a.postedDate)));
/*export const selectBookingById = (bookingId: string) => createSelector(
 selectAllBookings,
 (bookings: Booking[]) => bookings.find(booking => booking.id === bookingId)
 );*/

// From Adapter
// Selectors
const {
    selectEntities: selectAdapterBookingEntities,
    selectTotal: selectAdapterBookingTotal,
    selectAll: selectAdapterAllBookings,
    selectIds: selectAdapterBookingIds
} = bookingAdapter.getSelectors();

export const selectBookingState = createFeatureSelector<BookingAdapterState>(bookingFeatureKey);
export const selectBookingIds = createSelector(selectBookingState, selectAdapterBookingIds);
export const selectBookingEntities = createSelector(selectBookingState, selectAdapterBookingEntities);
export const selectAllBookings = createSelector(selectBookingState, selectAdapterAllBookings);
export const selectAllSortedBookings = createSelector(
    selectAllBookings,
    (bookings: Booking[]) => bookings.sort(
        (a: Booking, b: Booking) => b.postedDate.localeCompare(a.postedDate))
)
export const selectBookingById = (bookingId: string) => createSelector(
    selectAllBookings,
    (bookings: Booking[]) => bookings.find(booking => booking.id === bookingId)
);

