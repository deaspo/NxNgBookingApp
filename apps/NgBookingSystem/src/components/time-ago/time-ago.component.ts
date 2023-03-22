import { Component, Input } from '@angular/core';
import { formatDistanceToNow, parseISO } from "date-fns";

@Component({
               selector: 'app-time-ago',
               templateUrl: './time-ago.component.html',
               styleUrls: ['./time-ago.component.css']
           })
export class TimeAgoComponent {
    @Input() timeStamp!: string;
    timeAgo = '';

    ngOnInit() {
        if (this.timeStamp) {
            const date = parseISO(this.timeStamp);
            const timePeriod = formatDistanceToNow(date);
            this.timeAgo = `${timePeriod} ago`
        }
    }
}
