import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookedDateComponent } from './booked-date/booked-date.component';
import { BookingLocationComponent } from './booking-location/booking-location.component';
import { BookingPriceComponent } from './booking-price/booking-price.component';
import { BookingListItemComponent } from './bookings-list/booking-list-item/booking-list-item.component';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { ReactionButtonComponent } from './reaction-button/reaction-button.component';
import { TimeAgoComponent } from './time-ago/time-ago.component';

@NgModule({
              declarations: [
                  DialogsComponent,
                  BookedDateComponent,
                  BookingLocationComponent,
                  BookingPriceComponent,
                  BookingsListComponent,
                  BookingListItemComponent,
                  TimeAgoComponent,
                  ReactionButtonComponent
              ],
              imports: [CommonModule],
              exports: [
                  BookedDateComponent,
                  BookingLocationComponent,
                  BookingPriceComponent,
                  BookingsListComponent,
                  BookingListItemComponent,
                  TimeAgoComponent,
                  ReactionButtonComponent
              ]
          })
export class ComponentsModule {}
