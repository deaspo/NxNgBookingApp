import { createAction, props } from '@ngrx/store';
import { Booking, ReactionType } from "../../../models/booking";

export const LoadAddBookings = createAction(
    '[Booking] Load Bookings'
);

export const LoadAddBookingsSuccess = createAction(
    '[Booking] Load Bookings Success',
    props<{ data: Booking[] }>()
);

export const LoadAddBookingsFailure = createAction(
    '[Booking] Load Bookings Failure',
    props<{ error: any }>()
);

export const AddBooking = createAction(
    '[Booking] Add Booking',
    (booking: Booking) => ({ booking })
)
export const UpdateBooking = createAction('[Booking] Update Booking', (updatedBooking: Booking) => ({ updatedBooking }));
export const DeleteBooking = createAction('[Booking] Remove Booking', (bookingId: string) => ({ bookingId }));
export const ReactionAdded = createAction('[Booking] Reaction Added', (bookingId: string, reaction: ReactionType) => ({
    bookingId,
    reaction
}));

export const ThumbsDown = createAction('[Bookings] Thumbs Down', props<{ bookingId: string }>());
export const UpdateBookingError = createAction('[Bookings] Update Booking Error');