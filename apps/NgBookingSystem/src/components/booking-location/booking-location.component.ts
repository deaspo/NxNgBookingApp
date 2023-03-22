import { Component, Input } from '@angular/core';

@Component({
               selector: 'app-booking-location',
               templateUrl: './booking-location.component.html',
               styleUrls: ['./booking-location.component.css']
           })
export class BookingLocationComponent {
    @Input() locationId!: string;
    location: string;

    constructor() {
        this.location = 'Unknown';
    }

}
