export interface ReactionType {
    thumbsUp: number,
    thumbsDown: number
}

export interface Booking {
    id: string;
    bookedHours: number;
    bookingTitle: string;
    bookingDate: string;
    bookingPrice: number;
    bookingLocationId: string;
    postedDate: string;
    reactions: ReactionType
}
