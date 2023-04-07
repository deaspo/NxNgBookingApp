import { Component } from '@angular/core';
import { BookingFormData } from "apps/NgBookingSystem/src/dialogs/booking-dialog/booking-dialog.component";
import { useAddNewBookingMutation } from "apps/NgBookingSystem/src/features/bookings/store/api/books-api";
import {
    useAddNewLocationMutation,
    useGetLocationByIdQuery
} from "apps/NgBookingSystem/src/features/locations/store/api";
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

    onAddBooking(newBookingData: BookingFormData) {
        const { bookingTitle, bookingPrice, bookingLocationId, bookingDate, bookedHours } = newBookingData.booking;
        const location = newBookingData.location;
        const canSave = [bookingTitle, bookedHours, bookingDate, bookingLocationId].every(Boolean);

        if (canSave) {
            try {
                // Save new location decision - ?
                if (location.id) {
                    useGetLocationByIdQuery(location.id).subscribe(res => {
                        const { data } = res;
                        if (!data) { // new location
                            const addLocation = useAddNewLocationMutation();

                            addLocation.dispatch(location).unwrap()
                        }
                    });
                }

                // Add new booking
                const addBooking = useAddNewBookingMutation();
                addBooking.dispatch(
                    {
                        bookedHours: bookedHours,
                        bookingDate: new Date(bookingDate).toISOString(),
                        bookingLocationId: bookingLocationId,
                        bookingPrice: bookingPrice,
                        bookingTitle: bookingTitle,
                        id: nanoid()
                    }
                ).unwrap();

                /*                this.storeBooking.dispatch(AddBooking(
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
                 }));*/
                this.onHideForm();
            }
            catch (e) {
                console.warn('Failed to save booking with err', e)
            }
        }
    }
}
