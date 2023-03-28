import { Component } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { selectAllBookings } from "apps/NgBookingSystem/src/features/bookings/store/selectors/bookings.selectors";
import { Observable } from "rxjs";
import { Booking } from "../../models/booking";
import { BookingState } from "../store/reducer/booking.reducer";

@Component({
               selector: 'app-bookings-view',
               templateUrl: './bookings-view.component.html',
               styleUrls: ['./bookings-view.component.css']
           })
export class BookingsViewComponent {
    bookings: Observable<Booking[]>;

    constructor(private store: Store<BookingState>) {
        this.bookings = this.store.pipe(select(selectAllBookings))
    }
}
