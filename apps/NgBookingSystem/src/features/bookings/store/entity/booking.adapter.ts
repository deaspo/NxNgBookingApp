import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Booking } from "../../../models/booking";

export interface BookingAdapterState extends EntityState<Booking> {
}

export function selectBookingId(b: Booking) {
    return b.id;
}

export function sortByPostedDate(a: Booking, b: Booking) {
    return b.postedDate.localeCompare(a.postedDate);
}

export const bookingAdapter: EntityAdapter<Booking> = createEntityAdapter<Booking>(
    {
        selectId: selectBookingId,
        sortComparer: sortByPostedDate
    });
export const initialBookingStateAdapter: BookingAdapterState = bookingAdapter.getInitialState(
    {})