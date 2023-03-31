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
import { BookingAddComponent } from './booking-add/booking-add.component';
import { BookingsViewComponent } from './bookings-view/bookings-view.component';
import { BookingEffectsEffects } from './store/effects/booking-effects.effects';
import { bookingAdapterReducer, bookingFeatureKey } from "./store/reducer/booking.reducer";

@NgModule({
              declarations: [
                  BookingsViewComponent,
                  BookingAddComponent
              ],
              imports: [
                  CommonModule,
//                  StoreModule.forFeature(bookingFeatureKey, bookingReducer),
                  StoreModule.forFeature(bookingFeatureKey, bookingAdapterReducer),
                  ComponentsModule,
                  MatIconModule,
                  MatButtonModule,
                  MatTooltipModule,
                  MatListModule,
                  RouterLink,
                  EffectsModule.forFeature([BookingEffectsEffects])
              ],
              exports: [
                  BookingsViewComponent,
                  BookingAddComponent
              ]
          })
export class BookingsModule {}
