import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { ComponentsModule } from "apps/NgBookingSystem/src/components/components.module";
import { DialogsModule } from "apps/NgBookingSystem/src/dialogs/dialogs.module";
import { BookingsModule } from "apps/NgBookingSystem/src/features/bookings/bookings.module";
import { BookingPageComponent } from './booking-page/booking-page.component';
import { BookingsPageComponent } from './bookings-page/bookings-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LocationsPageComponent } from './locations-page/locations-page.component';

@NgModule({
              declarations: [
                  BookingPageComponent,
                  BookingsPageComponent,
                  FaqPageComponent,
                  HomePageComponent,
                  LocationsPageComponent
              ],
              imports: [CommonModule, RouterLink, BookingsModule, DialogsModule, ComponentsModule, MatMenuModule, MatIconModule, MatTooltipModule, MatButtonModule],
              exports: [
                  BookingPageComponent,
                  BookingsPageComponent,
                  FaqPageComponent,
                  HomePageComponent,
                  LocationsPageComponent
              ]
          })
export class PagesModule {}
