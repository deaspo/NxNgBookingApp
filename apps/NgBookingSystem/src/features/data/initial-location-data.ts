import { LocationState } from "../locations/store/reducer/location.reducer";
import { LocationProps } from "../models/location";

export const initialLocationsAdapter: LocationProps[] = [
    { id: "sk_bl_bratislava", city: "Bratislava", isoCode: "SK", country: "Slovakia" },
    { id: "at_9_vienna", city: "Vienna", isoCode: "AT", country: "Austria" },
    { id: "cz_10_prague", city: "Prague", isoCode: "CZ", country: "Czech" },
    { id: "hu_bu_budapest", city: "Budapest", isoCode: "HU", country: "Hungary" },
    { id: "pl_mz_warsaw", city: "Warsaw", isoCode: "PL", country: "Poland" },
    { id: "by_hm_minsk", city: "Minsk", isoCode: "BY", country: "Belarus" }
]

export const initialLocationState: LocationState = {
    locations: initialLocationsAdapter
};