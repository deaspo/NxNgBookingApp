import { Component, Input, SimpleChanges } from '@angular/core';

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
        this.setPriceInfo();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.value = changes['value'].currentValue;
        this.setPriceInfo();
    }

    setPriceInfo() {
        if (this.value && this.value > 0) {
            this.price = this.value.toString();
        }
        else {
            this.price = '0';
        }
    }
}
