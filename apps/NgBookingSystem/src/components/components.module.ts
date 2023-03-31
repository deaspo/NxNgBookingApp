import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { BookedDateComponent } from './booked-date/booked-date.component';
import { BookingLocationComponent } from './booking-location/booking-location.component';
import { BookingPriceComponent } from './booking-price/booking-price.component';
import { ReactionButtonComponent } from './reaction-button/reaction-button.component';
import { TimeAgoComponent } from './time-ago/time-ago.component';

@NgModule({
              declarations: [
                  BookedDateComponent,
                  BookingLocationComponent,
                  BookingPriceComponent,
                  TimeAgoComponent,
                  ReactionButtonComponent
              ],
              imports: [CommonModule, MatButtonModule],
              exports: [
                  BookedDateComponent,
                  BookingLocationComponent,
                  BookingPriceComponent,
                  TimeAgoComponent,
                  ReactionButtonComponent
              ]
          })
export class ComponentsModule {}
