import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { BookingState } from "apps/NgBookingSystem/src/features/bookings/store/reducer/booking.reducer";
import { selectBookingById } from "apps/NgBookingSystem/src/features/bookings/store/selectors/bookings.selectors";
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";

@Component({
               selector: 'app-bookings-page',
               templateUrl: './bookings-page.component.html',
               styleUrls: ['./bookings-page.component.css']
           })
export class BookingsPageComponent {
    showBookingsList: boolean;
    showBookingForm: boolean;
    bookingInfo: Booking | undefined;

    constructor(private storeBooking: Store<BookingState>) {
        this.showBookingsList = true;
        this.showBookingForm = false;
    }

    onShowForm() {
        this.showBookingsList = false;
        this.showBookingForm = true;
    }

    onHideForm() {
        this.showBookingsList = true;
        this.showBookingForm = false;
        this.bookingInfo = undefined;
    }

    onEditBooking(bookingId: string) {
        this.storeBooking.select(selectBookingById(bookingId)).subscribe((res: Booking | undefined) => {
            if (res) {
                this.bookingInfo = res;
                // Show Edit booking page
                this.onShowForm();
            }
        })
    }
}
