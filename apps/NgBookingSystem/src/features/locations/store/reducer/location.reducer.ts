import { createReducer } from '@ngrx/store';
import { Location } from '../../../models/location';

export const locationFeatureKey = 'location';

export interface LocationState {
    locations: Location[]
}

export const initialState: LocationState = {
    locations: [{ id: '0', location: 'Bratislava' },
        { id: '1', location: 'Vienna' },
        { id: '2', location: 'Prague' }]
};

export const locationReducer = createReducer(
    initialState
);
