import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { StoreModule } from "@ngrx/store";
import { ComponentsModule } from "apps/NgBookingSystem/src/components/components.module";
import { BookingAddComponent } from './booking-add/booking-add.component';
import { BookingsViewComponent } from './bookings-view/bookings-view.component';
import { bookingFeatureKey, bookingReducer } from "./store/reducer/booking.reducer";

@NgModule({
              declarations: [
                  BookingsViewComponent,
                  BookingAddComponent
              ],
              imports: [CommonModule, StoreModule.forFeature(bookingFeatureKey, bookingReducer), ComponentsModule, MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule],
              exports: [
                  BookingsViewComponent,
                  BookingAddComponent
              ]
          })
export class BookingsModule {}
