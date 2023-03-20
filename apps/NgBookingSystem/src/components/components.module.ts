import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs/dialogs.component';
import { BookedDateComponent } from './booked-date/booked-date.component';
import { BookingLocationComponent } from './booking-location/booking-location.component';
import { BookingPriceComponent } from './booking-price/booking-price.component';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { BookingListItemComponent } from './bookings-list/booking-list-item/booking-list-item.component';
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
  ],
  imports: [CommonModule],
  exports: [
    BookedDateComponent,
    BookingLocationComponent,
    BookingPriceComponent,
    BookingsListComponent,
    BookingListItemComponent,
    TimeAgoComponent,
  ],
})
export class ComponentsModule {}
