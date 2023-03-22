import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";

import { bookingFeatureKey, BookingState } from "../reducer/booking.reducer";

export const selectBookingState = createFeatureSelector<BookingState>(bookingFeatureKey);
export const selectAllBookings = createSelector(selectBookingState, (state: BookingState) => state.bookings);
const selectBookingsById = (bookingId: string) => createSelector(
    selectAllBookings,
    (bookings: Booking[]) => bookings.find(booking => booking.id === bookingId)
);