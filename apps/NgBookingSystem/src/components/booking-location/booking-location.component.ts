import { Component, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { LocationState } from "apps/NgBookingSystem/src/features/locations/store/reducer/location.reducer";
import {
    selectLocationById
} from "apps/NgBookingSystem/src/features/locations/store/selectors/all-locations.selectors";

@Component({
               selector: 'app-booking-location',
               templateUrl: './booking-location.component.html',
               styleUrls: ['./booking-location.component.css']
           })
export class BookingLocationComponent {
    @Input() locationId!: string;
    location: string;

    constructor(private store: Store<LocationState>) {
        this.location = 'Unknown';
    }

    ngOnInit() {
        this.store.select(selectLocationById(this.locationId)).subscribe((results) => {
            if (results) {
                this.location = results.location
            }
        });
    }

}
