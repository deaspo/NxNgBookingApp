import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { ThumbsDown } from "apps/NgBookingSystem/src/features/bookings/store/actions/booking.actions";
import { BookingState } from "apps/NgBookingSystem/src/features/bookings/store/reducer/booking.reducer";
import { selectBookingById } from "apps/NgBookingSystem/src/features/bookings/store/selectors/bookings.selectors";
import { EMPTY, skipWhile } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

@Injectable()
export class BookingEffectsEffects {

    thumbsDown$ = createEffect(() => this.actions$.pipe(
        ofType(ThumbsDown),
        switchMap(({ bookingId }) => this.store.select(selectBookingById(bookingId)).pipe(
            skipWhile(data => data === undefined),
            map(booking => {
                if (booking) {

                    const newValue = booking.reactions['thumbsDown'] + 1;
                    const newReaction = { ...booking.reactions, ['thumbsDown']: newValue };
                    const nb = { ...booking, reactions: newReaction }

                    return ({
                        type: '[Booking] Update Booking',
                        updatedBooking: nb
                    });
                }
                else {
                    return ({ type: '[Bookings] Update Booking Error' });
                }
            }),
            catchError(() => EMPTY)
        ))
    ))

    constructor(private actions$: Actions, private store: Store<BookingState>) {}
}
