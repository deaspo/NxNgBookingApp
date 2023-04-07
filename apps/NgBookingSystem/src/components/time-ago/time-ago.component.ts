import { Component, Input, SimpleChanges } from '@angular/core';
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
            this.setTimeDate(this.timeStamp);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        const stamp = changes['timeStamp'].currentValue;
        if (stamp) {
            this.setTimeDate(stamp)
        }
    }

    setTimeDate(stamp: string) {
        const date = parseISO(stamp);
        const timePeriod = formatDistanceToNow(date);
        this.timeAgo = `${timePeriod} ago`
    }
}
