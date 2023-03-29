import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { AddBooking } from "apps/NgBookingSystem/src/features/bookings/store/actions/booking.actions";
import { BookingState } from "apps/NgBookingSystem/src/features/bookings/store/reducer/booking.reducer";
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";
import { nanoid } from "nanoid";

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

    onAddBooking(newBooking: Pick<Booking, "bookingLocationId" | "bookedHours" | "bookingTitle" | "bookingPrice" | "bookingDate">) {
        const { bookingTitle, bookingPrice, bookingLocationId, bookingDate, bookedHours } = newBooking
        const canSave = [bookingTitle, bookedHours, bookingDate, bookingLocationId].every(Boolean);

        if (canSave) {
            try {
                this.storeBooking.dispatch(AddBooking(
                    {
                        bookedHours: bookedHours,
                        bookingDate: new Date(bookingDate).toISOString(),
                        bookingLocationId: bookingLocationId,
                        bookingPrice: bookingPrice,
                        bookingTitle: bookingTitle,
                        id: nanoid(),
                        postedDate: new Date().toISOString(),
                        reactions: {
                            thumbsDown: 0,
                            thumbsUp: 0
                        }
                    }));
                this.onHideForm();
            }
            catch (e) {
                console.warn('Failed to save booking with err', e)
            }
        }
    }
}
