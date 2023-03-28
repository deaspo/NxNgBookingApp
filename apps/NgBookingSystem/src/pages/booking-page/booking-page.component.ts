import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { DeleteBooking } from "apps/NgBookingSystem/src/features/bookings/store/actions/booking.actions";
import { selectBookingById } from "apps/NgBookingSystem/src/features/bookings/store/selectors/bookings.selectors";
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

    constructor(private route: ActivatedRoute, private location: Location, private store: Store<Booking>, private router: Router) {
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
        this.store.select(selectBookingById(this.bookingId)).subscribe(res => {
            if (res) {
                this.bookingInfo = res;
                this.showBookingInfo = true;
                this.showNotFoundMessage = false;
            }
            else {
                this.showNotFoundMessage = true
            }
        })
    }

    async onDeleteItem() {
        this.store.dispatch(DeleteBooking(this.bookingId));
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

    onEditBooking() {
        this.onShowForm();
    }
}
