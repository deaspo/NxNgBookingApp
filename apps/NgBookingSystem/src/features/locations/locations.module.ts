import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { locationFeatureKey, locationReducer } from "./store/reducer/location.reducer";

@NgModule({
              declarations: [],
              imports: [
                  CommonModule,
                  StoreModule.forFeature(locationFeatureKey, locationReducer)
              ]
          })
export class LocationsModule {}
