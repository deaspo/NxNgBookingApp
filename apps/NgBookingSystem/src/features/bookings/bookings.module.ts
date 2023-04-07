import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from "@ngrx/store";
import { ComponentsModule } from "apps/NgBookingSystem/src/components/components.module";
import { extendedBookingApiSlice } from "apps/NgBookingSystem/src/features/bookings/store/api/books-api";

import { StoreRtkQueryModule } from 'ngrx-rtk-query';
import { BookingAddComponent } from './booking-add/booking-add.component';
import { BookingsViewComponent } from './bookings-view/bookings-view.component';
import { BookingEffectsEffects } from './store/effects/booking-effects.effects';

/*export type RootBookingsState = {
 [extendedBookingApiSlice.reducerPath]: ReturnType<typeof extendedBookingApiSlice.reducer>
 }

 const reducers: ActionReducerMap<RootBookingsState> = {
 [extendedBookingApiSlice.reducerPath]: extendedBookingApiSlice.reducer
 }*/

@NgModule({
              declarations: [
                  BookingsViewComponent,
                  BookingAddComponent
              ],
              imports: [
                  StoreModule.forFeature(
                      extendedBookingApiSlice.reducerPath,
                      extendedBookingApiSlice.reducer, { metaReducers: [extendedBookingApiSlice.metareducer] }),
                  CommonModule,
                  ComponentsModule,
                  MatIconModule,
                  MatButtonModule,
                  MatTooltipModule,
                  MatListModule,
                  RouterLink,
                  EffectsModule.forFeature([BookingEffectsEffects]),
                  StoreRtkQueryModule.forRoot({ setupListeners: true })
              ],
              exports: [
                  BookingsViewComponent,
                  BookingAddComponent
              ]
          })
export class BookingsModule {}
