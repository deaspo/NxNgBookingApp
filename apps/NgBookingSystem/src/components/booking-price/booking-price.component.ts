import { Component, Input } from '@angular/core';

@Component({
               selector: 'app-booking-price',
               templateUrl: './booking-price.component.html',
               styleUrls: ['./booking-price.component.css']
           })
export class BookingPriceComponent {
    @Input() value: number | undefined;
    price: string;

    constructor() {
        this.price = '0';
    }

    ngOnInit() {
        if (this.value && this.value > 0) {
            this.price = this.value.toString();
        }
    }
}
