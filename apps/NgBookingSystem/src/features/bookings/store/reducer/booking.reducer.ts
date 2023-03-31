import { createReducer, on } from '@ngrx/store';
import { sub } from 'date-fns';
import { Booking } from "../../../models/booking";
import { AddBooking, DeleteBooking, ReactionAdded, UpdateBooking } from "../actions/booking.actions";

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
            postedDate: sub(new Date(), { minutes: 50 }).toISOString(),
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
            postedDate: sub(new Date(), { minutes: 40 }).toISOString(),
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
            postedDate: sub(new Date(), { minutes: 30 }).toISOString(),
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
            postedDate: sub(new Date(), { minutes: 25 }).toISOString(),
            reactions: {
                thumbsUp: 4,
                thumbsDown: 3
            }
        },
        {
            id: '4',
            bookedHours: 7,
            bookingTitle: 'Hotel Danube',
            bookingDate: sub(new Date(), { days: 10 }).toISOString(),
            bookingPrice: 500,
            bookingLocationId: "0",
            postedDate: sub(new Date(), { minutes: 20 }).toISOString(),
            reactions: {
                thumbsUp: 10,
                thumbsDown: 1
            }
        },
        {
            id: '5',
            bookedHours: 1,
            bookingTitle: 'Hotel Vienna',
            bookingDate: sub(new Date(), { days: 20 }).toISOString(),
            bookingPrice: 600,
            bookingLocationId: "1",
            postedDate: sub(new Date(), { minutes: 10 }).toISOString(),
            reactions: {
                thumbsUp: 50,
                thumbsDown: 10
            }
        },
        {
            id: '6',
            bookedHours: 3,
            bookingTitle: 'Hotel Czech',
            bookingDate: sub(new Date(), { days: 1 }).toISOString(),
            bookingPrice: 250,
            bookingLocationId: "2",
            postedDate: sub(new Date(), { minutes: 5 }).toISOString(),
            reactions: {
                thumbsUp: 30,
                thumbsDown: 12
            }
        },
        {
            id: '7',
            bookedHours: 5,
            bookingTitle: 'Hotel Cunovo',
            bookingDate: sub(new Date(), { days: 1 }).toISOString(),
            bookingPrice: 150,
            bookingLocationId: "",
            postedDate: sub(new Date(), { minutes: 1 }).toISOString(),
            reactions: {
                thumbsUp: 14,
                thumbsDown: 5
            }
        }
    ]
};

export const bookingReducer = createReducer(
    initialState,
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