import { Component, Input, SimpleChanges } from '@angular/core';
import { useAddReactionMutation } from "apps/NgBookingSystem/src/features/bookings/store/api/books-api";
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
    addReaction = useAddReactionMutation();

    constructor() {}

    ngOnInit() {
        this.updateReactionValues();
    }

    onClickReaction(e: Event, value: unknown) {
        e.preventDefault();
        e.stopPropagation();

        const key = Object.keys(reactionEmoji).find(k => reactionEmoji[k] === value as string);
        if (key) {
            const newValue = this.booking.reactions[key as keyof ReactionType] + 1;
            /*const updatedReaction: ReactionType = { ...this.booking.reactions, [key]: newValue };
             this.store.dispatch(ReactionAdded(this.booking.id, updatedReaction));*/
            this.addReaction.dispatch(
                {
                    bookingId: this.booking.id,
                    reactions: { ...this.booking.reactions, [key]: newValue }
                }).unwrap();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.booking = changes['booking'].currentValue;
        this.updateReactionValues();
    }

    updateReactionValues() {
        for (const [key, value] of Object.entries(reactionEmoji)) {
            this.reactionButtons[value] = this.booking.reactions[key as keyof ReactionType]
        }
    }

}
