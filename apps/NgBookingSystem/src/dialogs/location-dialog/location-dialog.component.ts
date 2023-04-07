import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Country, ICity } from "country-state-city";
import { LocationProps } from "../../features/models/location";
import { GetCitiesInfo, GetCountryCityInfo } from "./location-hooks";

@Component({
               selector: 'app-location-dialog',
               templateUrl: './location-dialog.component.html',
               styleUrls: ['./location-dialog.component.css']
           })
export class LocationDialogComponent {

    locationForm: FormGroup = new FormGroup<any>({});

    countries = GetCountryCityInfo();
    isoCode: string | undefined;
    cities: ICity[] | undefined;

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<LocationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Partial<LocationProps>) {}

    ngOnInit() {

        this.locationForm = this.fb.group(
            {
                country: [this.data.isoCode, Validators.required],
                city: new FormControl({ value: this.data.city, disabled: true })
            }
        )
    }

    onChange($event: any) {
        this.locationForm.get('city')?.patchValue('');

        this.isoCode = $event
        if (this.isoCode) {
            this.cities = GetCitiesInfo(this.isoCode);
            this.locationForm.get('city')?.enable();
        }
        else {
            this.cities = undefined;
            this.locationForm.get('city')?.disable();
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

}

@Component({
               selector: 'app-location-add-button',
               templateUrl: './location-add-button.component.html'
           })
export class LocationAddButtonComponent {
    locationData: Partial<LocationProps> = {};

    @Output() submitData = new EventEmitter<Partial<LocationProps>>();

    @Input() buttonText!: string;

    constructor(public dialog: MatDialog) {}

    openLocationForm() {
        const dialogRef = this.dialog.open(LocationDialogComponent, {
            data: this.locationData,
            minWidth: 448,
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                const cities = GetCitiesInfo(res.isoCode);
                const data: Partial<LocationProps> = {
                    city: res.city,
                    isoCode: res.isoCode,
                    stateCode: cities?.find(val => val.name === res.city)?.stateCode,
                    country: res.isoCode ? Country.getCountryByCode(res.isoCode)?.name : "Unknown Location"
                };
                this.buttonText = `${data.city}, ${data.country}`

                this.submitData.emit(data);
            }
        })
    }

}