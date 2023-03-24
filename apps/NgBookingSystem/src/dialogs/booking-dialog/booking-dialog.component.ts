import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { AddBooking } from "apps/NgBookingSystem/src/features/bookings/store/actions/booking.actions";
import { BookingState } from "apps/NgBookingSystem/src/features/bookings/store/reducer/booking.reducer";
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";
import { parseISO } from "date-fns";
import { nanoid } from "nanoid";
import { LocationState } from "../../features/locations/store/reducer/location.reducer";
import { selectAllLocations } from "../../features/locations/store/selectors/all-locations.selectors";

interface LocOptions {
    value: string;
    viewValue: string;
}

@Component({
               selector: 'app-booking-dialog',
               templateUrl: './booking-dialog.component.html',
               styleUrls: ['./booking-dialog.component.css']
           })
export class BookingDialogComponent {
    locationOptions: LocOptions[] = [];
    @Output() hideForm = new EventEmitter();
    bookingForm: FormGroup = new FormGroup<any>({});
    selectedLocation: string | undefined;

    private _selected: Booking | undefined;

    constructor(
        private storeLocation: Store<LocationState>,
        private storeBooking: Store<BookingState>,
        private fb: FormBuilder
    ) {
    }

    get bookingInfo(): Booking | undefined {
        return this._selected;
    }

    @Input()
    set bookingInfo(value: Booking | undefined) {
        this._selected = value;
    }

    ngOnInit() {
        this.bookingForm = this.fb.group(
            {
                title: [this.bookingInfo?.bookingTitle, Validators.required],
                hours: [this.bookingInfo?.bookedHours, Validators.required],
                date: [this.bookingInfo?.bookingDate],
                price: [this.bookingInfo?.bookingPrice],
                location: this.fb.group(
                    {
                        locationId: [this.bookingInfo?.bookingLocationId, Validators.required]
                    })
            });
        this.selectedLocation = this.bookingInfo?.bookingLocationId;

        this.storeLocation.pipe(select(selectAllLocations)).subscribe((res) => {
            for (const { location, id } of res) {
                this.locationOptions.push({ value: id, viewValue: location })
            }
        });

        const res = this.bookingForm.get('date')?.value;
        if (res === null || res === undefined) {
            this.bookingForm.get('date')?.patchValue(new Date().toISOString());
        }
        else {
            this.bookingForm.get('date')?.patchValue(parseISO(res).toISOString())
        }
    }

    onCancel() {
        this.hideForm.emit();
    }

    async onSubmit() {
        const title = this.bookingForm.value.title;
        let date = this.bookingForm.value.date;
        const hours = this.bookingForm.value.hours;
        const price = this.bookingForm.value.price;
        const locId = this.bookingForm.value.location?.locationId;

        const canSave = [title, hours, date, locId].every(Boolean);

        date = new Date(date).toISOString();

        if (canSave) {
            try {
                this.storeBooking.dispatch(AddBooking(
                    {
                        bookedHours: hours ? hours : 0,
                        bookingDate: date!,
                        bookingLocationId: locId!,
                        bookingPrice: price ? price : 0,
                        bookingTitle: title!,
                        id: nanoid(),
                        postedDate: new Date().toISOString(),
                        reactions: {
                            thumbsDown: 0,
                            thumbsUp: 0
                        }
                    }));
                this.hideForm.emit();
            }
            catch (e) {
                console.warn('Failed to save booking with err', e)
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.bookingInfo = changes['bookingInfo'].currentValue;
    }
}
