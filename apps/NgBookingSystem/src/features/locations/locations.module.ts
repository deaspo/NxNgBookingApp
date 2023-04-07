import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { extendedLocationApiSlice } from "apps/NgBookingSystem/src/features/locations/store/api";
import { StoreRtkQueryModule } from "ngrx-rtk-query";

/*export type RootLocationState = {
 [extendedLocationApiSlice.reducerPath]: ReturnType<typeof extendedLocationApiSlice.reducer>
 }

 const reducer: ActionReducerMap<RootLocationState> = {
 [extendedLocationApiSlice.reducerPath]: extendedLocationApiSlice.reducer
 }*/

@NgModule({
              declarations: [],
              imports: [
                  CommonModule,
                  //StoreModule.forFeature(locationFeatureKey, locationReducer)
                  StoreModule.forFeature(
                      extendedLocationApiSlice.reducerPath,
                      extendedLocationApiSlice.reducer,
                      { metaReducers: [extendedLocationApiSlice.metareducer] }
                  ),
                  StoreRtkQueryModule.forRoot({ setupListeners: true })
              ]
          })
export class LocationsModule {}
