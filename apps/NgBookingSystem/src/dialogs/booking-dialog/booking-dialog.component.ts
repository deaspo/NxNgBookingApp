import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { BookingState } from "apps/NgBookingSystem/src/features/bookings/store/reducer/booking.reducer";
import { Booking } from "apps/NgBookingSystem/src/features/models/booking";
import { parseISO } from "date-fns";
import { Schema, z, ZodError } from 'zod';
import { LocationState } from "../../features/locations/store/reducer/location.reducer";
import { selectAllLocations } from "../../features/locations/store/selectors/all-locations.selectors";

interface LocOptions {
    value: string;
    viewValue: string;
}

interface ParseResult {
    data: object | string | number | null;
    error: ZodError | null;
    success: boolean;
}

function safeParse(schema: Schema, inputData: object | string | number): ParseResult {
    let data = null, error: ZodError | null = null, success = false;

    try {
        data = schema.parse(inputData);
        success = schema.safeParse(inputData).success
    }
    catch (e: any) {
        error = e;
    }

    return { data, error, success };
}

export function allowedPriceRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // implement zod validation
        // Price within range 0 - 100 only
        const priceParser = z.number(
            {
                required_error: 'Price is required',
                invalid_type_error: 'Price must be a number'

            }).nonnegative().lt(101).safe().finite();
        const { success, error } = safeParse(priceParser, control.value);
        return success ? null : { ...error };

    }
}

@Component({
               selector: 'app-booking-dialog',
               templateUrl: './booking-dialog.component.html',
               styleUrls: ['./booking-dialog.component.css']
           })
export class BookingDialogComponent {
    locationOptions: LocOptions[] = [];
    @Output() hideForm = new EventEmitter();
    @Output() submitForm = new EventEmitter<Pick<Booking, "bookingLocationId" | "bookedHours" | "bookingTitle" | "bookingPrice" | "bookingDate">>()
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
                price: new FormControl(
                    this.bookingInfo?.bookingPrice ? this.bookingInfo?.bookingPrice : 0,
                    [allowedPriceRange()]
                ),
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
        const submitData: Pick<Booking, "bookingLocationId" | "bookedHours" | "bookingTitle" | "bookingPrice" | "bookingDate"> = {
            bookingTitle: this.bookingForm.value.title,
            bookingDate: new Date(this.bookingForm.value.date).toISOString(),
            bookedHours: this.bookingForm.value.hours,
            bookingPrice: this.bookingForm.value.price,
            bookingLocationId: this.bookingForm.value.location?.locationId
        }
        this.submitForm.emit(submitData);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.bookingInfo = changes['bookingInfo'].currentValue;
    }

    getPriceErrorMessage() {
        let errorMessages: string | undefined;
        const error = this.bookingForm.get('price')?.errors;
        if (this.bookingForm && error) {
            const error_code = error['issues'][0].code;
            if (error_code === 'too_small') {
                errorMessages = 'Must be greater than 0';
            }
            else if (error_code === 'too_big') {
                errorMessages = 'Cannot be larger than 100';
            }
            else if (error_code === 'invalid_type') {
                errorMessages = 'Price is required';
            }
        }
        return errorMessages;
    }
}
