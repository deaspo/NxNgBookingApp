import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationProps } from '../../../models/location';
import { locationAdapter, LocationAdapterState } from "../entity/location.adapter";

import { locationFeatureKey } from "../reducer/location.reducer";

/*export const selectLocationState = createFeatureSelector<LocationState>(locationFeatureKey);
 export const selectAllLocations = createSelector(selectLocationState, (state: LocationState) => state.locations)

 export const selectLocationById = (locationId: string) => createSelector(
 selectAllLocations,
 (locations: LocationProps[]) => locations.find(location => location.id === locationId)
 );*/

// From Adapter
export const {
    selectEntities: selectAdapterLocationEntities,
    selectTotal: selectAdapterLocationTotal,
    selectAll: selectAdapterAllLocations,
    selectIds: selectAdapterLocationIds
} = locationAdapter.getSelectors();

export const selectLocationState = createFeatureSelector<LocationAdapterState>(locationFeatureKey);
export const selectLocationIds = createSelector(selectLocationState, selectAdapterLocationIds);
export const selectLocationEntities = createSelector(selectLocationState, selectAdapterLocationEntities);
export const selectAllLocations = createSelector(selectLocationState, selectAdapterAllLocations);
export const selectLocationById = (locationId: string) => createSelector(
    selectAllLocations,
    (locations: LocationProps[]) => locations.find(location => location.id === locationId)
)


