import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";

import {
    BookingAdapterState,
    bookingFeatureKey,
    selectAdapterAllBookings,
    selectAdapterBookingEntities,
    selectAdapterBookingIds
} from "../reducer/booking.reducer";

export const selectBookingState = createFeatureSelector<BookingState>(bookingFeatureKey);
export const selectAllBookings = createSelector(selectBookingState, (state: BookingState) => state.bookings.slice().sort((a, b) => b.postedDate.localeCompare(a.postedDate)));
export const selectBookingById = (bookingId: string) => createSelector(
    selectAllBookings,
    (bookings: Booking[]) => bookings.find(booking => booking.id === bookingId)
);