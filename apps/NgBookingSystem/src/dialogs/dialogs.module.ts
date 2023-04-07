import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from "@ng-select/ng-select";
import {
    LocationAddButtonComponent,
    LocationDialogComponent
} from "apps/NgBookingSystem/src/dialogs/location-dialog/location-dialog.component";
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';

@NgModule({
              declarations: [BookingDialogComponent, LocationDialogComponent, LocationAddButtonComponent],
              imports: [
                  CommonModule,
                  ReactiveFormsModule,
                  MatInputModule,
                  FormsModule,
                  MatDatepickerModule,
                  MatSelectModule,
                  MatDialogModule,
                  MatButtonModule,
                  MatNativeDateModule,
                  BrowserAnimationsModule,
                  NgSelectModule,
                  MatFormFieldModule
              ],
              exports: [BookingDialogComponent]
          })
export class DialogsModule {}
