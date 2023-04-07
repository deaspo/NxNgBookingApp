import { Component } from '@angular/core';
import { useGetBookingsQuery } from "apps/NgBookingSystem/src/features/bookings/store/api/books-api";
import { Booking } from "../../models/booking";

@Component({
               selector: 'app-bookings-view',
               templateUrl: './bookings-view.component.html',
               styleUrls: ['./bookings-view.component.css']
           })
export class BookingsViewComponent {

    bookingsQuery$ = useGetBookingsQuery();

    trackByFn(_index: number, booking: Booking): string {
        return booking.id;
    }
}
