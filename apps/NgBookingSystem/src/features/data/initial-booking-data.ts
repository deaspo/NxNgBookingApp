import { sub } from 'date-fns';
import { BookingState } from "../bookings/store/reducer/booking.reducer";
import { Booking } from "../models/booking";

export const initialBookingsAdapterState: Booking[] = [
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
];

export const initialBookingState: BookingState = {
    bookings: initialBookingsAdapterState
};