import { Component, SimpleChanges } from '@angular/core';
import { useGetBookingsByLocationIdQuery } from "apps/NgBookingSystem/src/features/bookings/store/api/books-api";
import { useGetLocationsQuery } from "apps/NgBookingSystem/src/features/locations/store/api";
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";
import { map } from "rxjs/operators";

interface LocationType {
    value: string;
    label: string;
    isoCode: string;
    locationId: string;
    city: string;
}

@Component({
               selector: 'app-locations-page',
               templateUrl: './locations-page.component.html',
               styleUrls: ['./locations-page.component.css']
           })
export class LocationsPageComponent {
    readonly bookedCountries$ = useGetLocationsQuery().pipe(
        map(res => {
            const { data } = res;
            if (data) {
                const uniquieCountries = [...new Map(data.map((m) => [m.country, m])).values()];
                return uniquieCountries.map(loc => ({
                    value: loc.country,
                    isoCode: loc.isoCode,
                    locationId: loc.id,
                    label: loc.country,
                    city: loc.city
                }))
            }
            else {return []}
        })
    );

    isoCode: string | undefined;
    isLoadingLocation: boolean;
    isSuccessBookings: boolean;
    isErrorBooking: boolean;
    errorBooking: any = {};

    bookings: Booking[] | undefined;

    locationInfoMessage = 'No available bookings'

    bookedCities: Partial<LocationType>[] = [];

    constructor() {
        this.isSuccessBookings = false;
        this.isLoadingLocation = false;
        this.isErrorBooking = false;
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('changes', changes)
    }

    onSelectionCountryChange($value: string) {
        this.bookedCities = [];
        useGetLocationsQuery().subscribe(res => {
            const { data } = res;
            if (data && data.length > 0) {
                this.bookedCities = data.filter(loc => loc.isoCode === $value).map(loc => ({
                    value: loc.city,
                    locationId: loc.id,
                    label: loc.country
                }));
            }
        });
    }

    onSelectCityChange($value: Partial<LocationType>) {
        // All bookings in that city
        if ($value) {
            useGetBookingsByLocationIdQuery($value.locationId).subscribe(res => {
                const { data, isSuccess, isError, error, isLoading } = res;

                // Set params
                this.isErrorBooking = isError;
                this.isSuccessBookings = isSuccess;
                this.errorBooking = error;
                this.bookings = data;
                this.isLoadingLocation = isLoading;

                if (data && data.length > 0) {
                    this.locationInfoMessage = `Bookings available in ${$value.value}, ${$value.label}`;
                }
                else {
                    this.locationInfoMessage = 'No available bookings'
                }
            })
        }
        else {
            this.locationInfoMessage = 'No available bookings';
            this.bookings = undefined;
        }
    }
}
