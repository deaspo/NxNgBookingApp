import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule } from "@angular/router";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ControlsModule } from "apps/NgBookingSystem/src/controls/controls.module";
import { DialogsModule } from "apps/NgBookingSystem/src/dialogs/dialogs.module";
import { BookingsModule } from "apps/NgBookingSystem/src/features/bookings/bookings.module";
import { LocationsModule } from "apps/NgBookingSystem/src/features/locations/locations.module";
import { BookingPageComponent } from "apps/NgBookingSystem/src/pages/booking-page/booking-page.component";
import { BookingsPageComponent } from "apps/NgBookingSystem/src/pages/bookings-page/bookings-page.component";
import { FaqPageComponent } from "apps/NgBookingSystem/src/pages/faq-page/faq-page.component";
import { HomePageComponent } from "apps/NgBookingSystem/src/pages/home-page/home-page.component";
import { LocationsPageComponent } from "apps/NgBookingSystem/src/pages/locations-page/locations-page.component";
import { PagesModule } from "apps/NgBookingSystem/src/pages/pages.module";
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './reducers';

@NgModule({
              declarations: [AppComponent],
              imports: [
                  BrowserModule,
                  RouterModule.forRoot(
                      [
                          { path: 'home', component: HomePageComponent },
                          { path: 'booking/:id', component: BookingPageComponent },
                          { path: 'bookings', component: BookingsPageComponent },
                          { path: 'locations', component: LocationsPageComponent },
                          { path: 'faq', component: FaqPageComponent },
                          { path: '', redirectTo: '/home', pathMatch: 'full' }
                      ]),
                  StoreModule.forRoot(reducers, { metaReducers }),
                  !environment.production ? StoreDevtoolsModule.instrument() : [],
                  EffectsModule.forRoot([AppEffects]),
                  RouterLink,
                  PagesModule,
                  ControlsModule,
                  BookingsModule,
                  LocationsModule,
                  DialogsModule
              ],
              providers: [],
              bootstrap: [AppComponent]
          })
export class AppModule {}
