import { Component, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { ReactionAdded } from "apps/NgBookingSystem/src/features/bookings/store/actions/booking.actions";
import { BookingState } from "apps/NgBookingSystem/src/features/bookings/store/reducer/booking.reducer";
import { Booking, ReactionType } from "apps/NgBookingSystem/src/features/models/booking";

interface emojiType {
    [x: string]: string
}

const reactionEmoji: emojiType = {
    thumbsUp: '👍',
    thumbsDown: '👎'
}

@Component({
               selector: 'app-reaction-button',
               templateUrl: './reaction-button.component.html',
               styleUrls: ['./reaction-button.component.css']
           })
export class ReactionButtonComponent {
    @Input() booking!: Booking;
    reactionButtons: any = {};

    constructor(private store: Store<BookingState>) {}

    ngOnInit() {
        for (const [key, value] of Object.entries(reactionEmoji)) {
            this.reactionButtons[value] = this.booking.reactions[key as keyof ReactionType]
        }
    }

    onClickReaction(e: Event, value: unknown) {
        e.preventDefault();
        e.stopPropagation();

        const key = Object.keys(reactionEmoji).find(k => reactionEmoji[k] === value as string);
        if (key) {
            /*if (key === 'thumbsDown') {
             this.store.dispatch(ThumbsDown({ bookingId: this.booking.id }))
             }*/

            const newValue = this.booking.reactions[key as keyof ReactionType] + 1;
            const updatedReaction: ReactionType = { ...this.booking.reactions, [key]: newValue };
            this.store.dispatch(ReactionAdded(this.booking.id, updatedReaction));
        }
    }

}
