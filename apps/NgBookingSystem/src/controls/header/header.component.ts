import { Component } from '@angular/core';
import { Navigation, NavItem } from './header-items';

@Component({
               selector: 'app-header',
               templateUrl: './header.component.html',
               styleUrls: ['./header.component.css']
           })
export class HeaderComponent {
    activeNav = 'Dashboard';
    navigation = Navigation;

    public setActive(item: NavItem): void {
        this.activeNav = item.name;
        item.current = !item.current;
    }
}
