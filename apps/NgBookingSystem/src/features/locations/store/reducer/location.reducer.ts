import { createReducer } from '@ngrx/store';
import { initialLocationState } from "apps/NgBookingSystem/src/features/data/initial-location-data";
import { initialLocationStateAdapter } from "apps/NgBookingSystem/src/features/locations/store/entity/location.adapter";
import { LocationProps } from "apps/NgBookingSystem/src/features/models/location";

export const locationFeatureKey = 'location';

export interface LocationState {
    locations: LocationProps[]
}

export const locationReducer = createReducer(
    initialLocationState
);

// For Adapter
export const locationAdapterReducer = createReducer(
    initialLocationStateAdapter
)