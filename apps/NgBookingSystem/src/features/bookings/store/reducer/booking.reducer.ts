import { createReducer, on } from '@ngrx/store';
import { sub } from 'date-fns';
import { Booking } from "../../../models/booking";
import { AddBooking, DeleteBooking, UpdateBooking } from "../actions/booking.actions";

export const bookingFeatureKey = 'booking';

export interface BookingState {
    bookings: Booking[];
}

export const initialState: BookingState = {
    bookings: [
        {
            id: '0',
            bookedHours: 7,
            bookingTitle: 'Hotel Bratislava',
            bookingDate: sub(new Date(), { days: 10 }).toISOString(),
            bookingPrice: 50,
            bookingLocationId: "0",
            postedDate: sub(new Date(), { minutes: 15 }).toISOString(),
            reactions: {
                thumbsUp: 3,
                thumbsDown: 1
            }
        },
        {
            id: '1',
            bookedHours: 1,
            bookingTitle: 'Hotel Austria',
            bookingDate: sub(new Date(), { days: 20 }).toISOString(),
            bookingPrice: 100,
            bookingLocationId: "1",
            postedDate: sub(new Date(), { minutes: 10 }).toISOString(),
            reactions: {
                thumbsUp: 5,
                thumbsDown: 0
            }
        },
        {
            id: '2',
            bookedHours: 3,
            bookingTitle: 'Hotel Prague',
            bookingDate: sub(new Date(), { days: 1 }).toISOString(),
            bookingPrice: 50,
            bookingLocationId: "2",
            postedDate: sub(new Date(), { minutes: 5 }).toISOString(),
            reactions: {
                thumbsUp: 0,
                thumbsDown: 2
            }
        },
        {
            id: '3',
            bookedHours: 5,
            bookingTitle: 'Hotel Hungary',
            bookingDate: sub(new Date(), { days: 1 }).toISOString(),
            bookingPrice: 5,
            bookingLocationId: "",
            postedDate: sub(new Date(), { minutes: 1 }).toISOString(),
            reactions: {
                thumbsUp: 4,
                thumbsDown: 3
            }
        }
    ]
};

export const bookingReducer = createReducer(
    initialState,
    on(AddBooking, (state: BookingState, { booking }) => {
        const postedDate = new Date().toISOString();
        const reaction = {
            thumbsDown: 0,
            thumbsUp: 0
        }
        const newBooking = { ...booking, postedDate, reaction }
        return { ...state, bookings: [...state.bookings, newBooking] }
    }),
    on(UpdateBooking, (state: BookingState, { updatedBooking }) => {
        const { id } = updatedBooking;
        updatedBooking.postedDate = new Date().toISOString();
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
    })
);