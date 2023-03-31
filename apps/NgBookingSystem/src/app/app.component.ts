import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { BookingState } from "apps/NgBookingSystem/src/features/bookings/store/reducer/booking.reducer";
import { initialAdapterState } from "apps/NgBookingSystem/src/features/data/initial-data";

@Component({
               selector: 'app-root',
               templateUrl: './app.component.html',
               styleUrls: ['./app.component.css']
           })
export class AppComponent {
    title = 'NgBookingSystem';

    constructor(private storeBooking: Store<BookingState>) {}

    ngOnInit() {
        this.storeBooking.dispatch({ type: '[Booking] Load Bookings Success', data: initialAdapterState })
    }
}
