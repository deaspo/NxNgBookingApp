import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';

@NgModule({
              declarations: [
                  BookingDialogComponent
              ],
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
                  BrowserAnimationsModule
              ],
              exports: [BookingDialogComponent]
          })
export class DialogsModule {}
