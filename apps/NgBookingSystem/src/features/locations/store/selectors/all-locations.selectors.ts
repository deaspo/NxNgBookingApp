import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Location } from '../../../models/location';

import { locationFeatureKey, LocationState } from "../reducer/location.reducer";

export const selectLocationState = createFeatureSelector<LocationState>(locationFeatureKey);
export const selectAllLocations = createSelector(selectLocationState, (state: LocationState) => state.locations)

export const selectLocationById = (locationId: string) => createSelector(
    selectAllLocations,
    (locations: Location[]) => locations.find(location => location.id === locationId)
);