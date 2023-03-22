import { createAction, props } from '@ngrx/store';

export const loadLocations = createAction(
  '[Location] Load Locations'
);

export const loadLocationsSuccess = createAction(
  '[Location] Load Locations Success',
  props<{ data: any }>()
);

export const loadLocationsFailure = createAction(
  '[Location] Load Locations Failure',
  props<{ error: any }>()
);
