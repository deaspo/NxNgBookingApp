import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { LocationProps } from "../../../models/location";

export interface LocationAdapterState extends EntityState<LocationProps> {
}

export function selectLocationId(l: LocationProps) {
    return l.id
}

export function sortByCountry(a: LocationProps, b: LocationProps) {
    return b.country.localeCompare(a.country)
}

export const locationAdapter: EntityAdapter<LocationProps> = createEntityAdapter(
    {
        selectId: selectLocationId,
        sortComparer: sortByCountry
    })

export const initialLocationStateAdapter: LocationAdapterState = locationAdapter.getInitialState({})