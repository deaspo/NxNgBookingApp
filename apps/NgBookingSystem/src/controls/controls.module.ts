import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
              declarations: [
                  FooterComponent,
                  HeaderComponent
              ],
              imports: [CommonModule, RouterLinkActive, RouterLink],
              exports: [FooterComponent, HeaderComponent]
          })
export class ControlsModule {}
