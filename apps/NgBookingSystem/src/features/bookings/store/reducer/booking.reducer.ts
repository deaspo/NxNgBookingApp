import { EntityState, Update } from "@ngrx/entity";
import { createReducer, on } from '@ngrx/store';
import { bookingAdapter, initialBookingStateAdapter } from "apps/NgBookingSystem/src/features/bookings/store/entity";
import { initialBookingState } from "apps/NgBookingSystem/src/features/data/initial-booking-data";

import { Booking } from "../../../models/booking";
import {
    AddBooking,
    DeleteBooking,
    LoadAddBookingsSuccess,
    ReactionAdded,
    UpdateBooking
} from "../actions/booking.actions";

export const bookingFeatureKey = 'booking';

export interface BookingState {
    bookings: Booking[];
}

export const bookingAdapterReducer = createReducer(
    initialBookingStateAdapter,
    on(AddBooking, (state: EntityState<Booking>, { booking }) => {
        return bookingAdapter.addOne(booking, state)
    }),
    on(UpdateBooking, (state: EntityState<Booking>, { updatedBooking }) => {
        const nBooking: Update<Booking> = { id: updatedBooking.id, changes: updatedBooking }
        return bookingAdapter.updateOne(nBooking, state);
    }),
    on(DeleteBooking, (state: EntityState<Booking>, { bookingId }) => {
        return bookingAdapter.removeOne(bookingId, state);
    }),
    on(ReactionAdded, (state: EntityState<Booking>, { bookingId, reaction }) => {
        const existingBooking = state.entities[bookingId];
        if (existingBooking) {
            const nBooking: Update<Booking> = { id: bookingId, changes: { ...existingBooking, reactions: reaction } };
            return bookingAdapter.updateOne(nBooking, state);
        }
        return state;
    }),
    on(LoadAddBookingsSuccess, (state: EntityState<Booking>, { data }) => {
        return bookingAdapter.addMany(data, state);
    })
);

export const bookingReducer = createReducer(
    initialBookingState,
    on(AddBooking, (state: BookingState, { booking }) => {
        return { ...state, bookings: [...state.bookings, booking] }
    }),
    on(UpdateBooking, (state: BookingState, { updatedBooking }) => {
        console.log(updatedBooking);
        const { id } = updatedBooking;
        const bookings = state.bookings.filter(booking => booking.id !== id);
        return {
            ...state, bookings: [...bookings, updatedBooking]
        }
    }),
    on(DeleteBooking, (state: BookingState, { bookingId }) => {
        const bookings = state.bookings.filter(booking => booking.id !== bookingId);
        return {
            ...state, bookings: bookings
        }
    }),
    on(ReactionAdded, (state: BookingState, { bookingId, reaction }) => {
        const stateCopy = { ...state };

        let existingBooking = stateCopy.bookings.find(booking => booking.id === bookingId);
        if (existingBooking) {
            const nBooking = { ...existingBooking, reactions: reaction };
            const bookings = stateCopy.bookings.filter(booking => booking.id !== bookingId);
            return {
                ...stateCopy, bookings: [...bookings, nBooking]
            }
        }
        return stateCopy
    })
);