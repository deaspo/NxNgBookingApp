import { Component, Input } from '@angular/core';
import { Booking, ReactionType } from "apps/NgBookingSystem/src/features/models/booking";

const reactionEmoji = {
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

    ngOnInit() {
        for (const [key, value] of Object.entries(reactionEmoji)) {
            this.reactionButtons[value] = this.booking.reactions[key as keyof ReactionType]
        }
    }
}
