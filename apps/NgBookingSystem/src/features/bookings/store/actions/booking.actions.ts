import { createAction, props } from '@ngrx/store';
import { Booking } from "../../../models/booking";

export const loadAddBookings = createAction(
    '[Booking] Load Bookings'
);

export const loadAddBookingsSuccess = createAction(
    '[Booking] Load Bookings Success',
    props<{ data: any }>()
);

export const loadAddBookingsFailure = createAction(
    '[Booking] Load Bookings Failure',
    props<{ error: any }>()
);

export const AddBooking = createAction(
    '[Booking] Add Booking',
    (booking: Booking) => ({ booking })
)
export const UpdateBooking = createAction('[Booking] Update Booking', (updatedBooking: Booking) => ({ updatedBooking }));
export const DeleteBooking = createAction('[Booking] Remove Booking', (bookingId: string) => ({ bookingId }));