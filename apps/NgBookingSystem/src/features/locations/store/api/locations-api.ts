import { createSelector } from "@ngrx/store";
import { apiSlice } from "../../../api/api-slice";
import { LocationProps } from "../../../models/location";

export const extendedLocationApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: builder => ({
            getLocations: builder.query<LocationProps[], void>(
                {
                    query: () => '/locations',
                    providesTags: (result) => result ? [
                        { type: 'Locations', id: 'LIST' },
                        ...result.map(({ id }) => ({ type: 'Locations' as const, id }))
                    ] : [{ type: 'Locations', id: 'LIST' }]
                }),
            getLocationById: builder.query<LocationProps | null | undefined, string>(
                {
                    query: id => `locations/?id=${id}`,
                    transformResponse: (response: LocationProps[]) => {
                        return response.at(0);
                    },
                    providesTags: (result, error, id) => [{ type: 'Locations', id }]
                }),
            addNewLocation: builder.mutation(
                {
                    query: initialLocations => ({
                        url: '/locations',
                        method: 'POST',
                        body: {
                            ...initialLocations
                        }
                    }),
                    invalidatesTags: ['Locations', 'Bookings']
                })
        })
    })

export const {
    useAddNewLocationMutation,
    useGetLocationByIdQuery,
    useGetLocationsQuery
} = extendedLocationApiSlice;
export const selectLocationResults = extendedLocationApiSlice.endpoints.getLocations.select();
// Memoized selector
export const selectLocationsData = createSelector(
    selectLocationResults,
    locationsResult => locationsResult.data)
