import { Component, Input, SimpleChanges } from '@angular/core';
import { useGetLocationByIdQuery } from "apps/NgBookingSystem/src/features/locations/store/api";

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

    ngOnInit() {
        this.setLocationInfo();
    }

    ngOnChanges(changes: SimpleChanges) {
        const info = changes['locationId'].currentValue;
        if (info) {
            this.setLocationInfo();
        }
    }

    setLocationInfo() {
        useGetLocationByIdQuery(this.locationId).subscribe(res => {

            const { data } = res;
            if (data) {
                this.location = `${data.city}, ${data.country}`
            }
        })
    }

}
