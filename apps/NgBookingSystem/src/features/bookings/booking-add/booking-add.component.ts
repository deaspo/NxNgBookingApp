import { Component, EventEmitter, Output } from '@angular/core';

@Component({
               selector: 'app-booking-add',
               templateUrl: './booking-add.component.html',
               styleUrls: ['./booking-add.component.css']
           })
export class BookingAddComponent {
    @Output() showingForm = new EventEmitter();

    constructor() {}

    clickAddNewBooking() {
        this.showingForm.emit(); // Tell parent that form will be being show
    }
}
