import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BookingPageComponent } from './booking-page/booking-page.component';
import { BookingsPageComponent } from './bookings-page/bookings-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { LocationsPageComponent } from './locations-page/locations-page.component';

@NgModule({
              declarations: [
                  BookingPageComponent,
                  BookingsPageComponent,
                  FaqPageComponent,
                  HomePageComponent,
                  LocationPageComponent,
                  LocationsPageComponent
              ],
              imports: [CommonModule, RouterLink],
              exports: [
                  BookingPageComponent,
                  BookingsPageComponent,
                  FaqPageComponent,
                  HomePageComponent,
                  LocationPageComponent,
                  LocationsPageComponent
              ]
          })
export class PagesModule {}
