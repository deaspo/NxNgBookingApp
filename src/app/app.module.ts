import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from "environments/environment";

import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { HeaderComponent } from './header/header.component';
import { metaReducers, reducers } from './reducers';

@NgModule({
            declarations: [
              AppComponent,
              HeaderComponent
            ],
            imports: [
              BrowserModule,
              StoreModule.forRoot(reducers, { metaReducers }),
              !environment.production ? StoreDevtoolsModule.instrument() : [],
              EffectsModule.forRoot([AppEffects])
            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule {}
