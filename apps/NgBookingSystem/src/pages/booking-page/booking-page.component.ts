import { Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BookingFormData } from "apps/NgBookingSystem/src/dialogs/booking-dialog/booking-dialog.component";
import {
    useDeleteBookingMutation,
    useGetBookingByIdQuery,
    useUpdateBookingMutation
} from "apps/NgBookingSystem/src/features/bookings/store/api/books-api";
import {
    useAddNewLocationMutation,
    useGetLocationByIdQuery
} from "apps/NgBookingSystem/src/features/locations/store/api";
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";

@Component({
               selector: 'app-booking-page',
               templateUrl: './booking-page.component.html',
               styleUrls: ['./booking-page.component.css']
           })
export class BookingPageComponent {
    bookingInfo: Booking | undefined;
    showBookingForm: boolean;
    showBookingInfo: boolean;
    showNotFoundMessage: boolean;
    private bookingId: string;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private store: Store<Booking>,
        private router: Router,
        private detectorRef: ChangeDetectorRef
    ) {
        this.bookingId = '';
        this.showBookingInfo = false;
        this.showBookingForm = false;
        this.showNotFoundMessage = true;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.bookingId = params['id'];
            if (params['id']) {
                this.getBooking();
            }
        })
    }

    getBooking() {
        useGetBookingByIdQuery(this.bookingId).subscribe(res => {
            const { data } = res;
            if (data) {
                this.bookingInfo = data;
                this.showBookingInfo = true;
                this.showNotFoundMessage = false;
            }
            else {

            }
        });
    }

    async onClickDeleteItem() {
        const deleteBooking = useDeleteBookingMutation();
        await deleteBooking.dispatch(this.bookingId).unwrap()
        await this.router.navigateByUrl('/bookings')
    }

    onShowForm() {
        this.showBookingInfo = false;
        this.showBookingForm = true;
    }

    onHideForm() {
        this.showBookingInfo = true;
        this.showBookingForm = false;
    }

    onClickEditBooking() {
        this.onShowForm();
    }

    onEditBooking(editedBookingData: BookingFormData) {
        const editedBooking = editedBookingData.booking;
        const location = editedBookingData.location;

        const { bookingTitle, bookedHours, bookingLocationId, bookingDate } = editedBooking;

        const canSave = [bookingTitle, bookedHours, bookingDate, bookingLocationId, this.bookingInfo].every(Boolean);

        if (canSave) {
            try {
                // Update booking
                const updateBooking = useUpdateBookingMutation();
                updateBooking.dispatch(
                    {
                        ...editedBooking,
                        id: this.bookingInfo?.id,
                        reactions: this.bookingInfo?.reactions
                    }
                ).unwrap()

                // Save new location decision - ?
                if (location.id) {
                    useGetLocationByIdQuery(location.id).subscribe(res => {
                        const { data } = res;
                        if (!data) { // new location
                            const addLocation = useAddNewLocationMutation();

                            addLocation.dispatch(location).unwrap();
                        }
                    });
                }

                this.onHideForm();
            }
            catch (e) {
                console.warn('Failed to save booking with err', e)
            }
            this.detectorRef.detectChanges();
        }
    }

    goBack() {
        this.location.back();
    }
}
