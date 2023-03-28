import { Component } from '@angular/core';
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

    constructor() {
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
}
