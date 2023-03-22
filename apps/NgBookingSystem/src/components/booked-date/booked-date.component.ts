import { Component, Input } from '@angular/core';
import { format, parseISO } from "date-fns";

@Component({
               selector: 'app-booked-date',
               templateUrl: './booked-date.component.html',
               styleUrls: ['./booked-date.component.css']
           })
export class BookedDateComponent {
    @Input() timeStamp?: string;
    bookedDate = 'Unknown';

    ngOnInit() {
        if (this.timeStamp) {
            this.bookedDate = format(parseISO(this.timeStamp), "dd-MM-yyyy");
        }
    }

}
