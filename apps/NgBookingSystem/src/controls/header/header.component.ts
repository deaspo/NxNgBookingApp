import { Component } from '@angular/core';
import { Navigation } from './header-items';

@Component({
               selector: 'app-header',
               templateUrl: './header.component.html',
               styleUrls: ['./header.component.css']
           })
export class HeaderComponent {
    navigation = Navigation;
}
