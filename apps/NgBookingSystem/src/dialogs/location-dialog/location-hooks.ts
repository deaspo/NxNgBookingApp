import { City, Country, ICity } from "country-state-city";

export function GetCitiesInfo(isoCode: string) {
    let cities: ICity[] | undefined = City.getCitiesOfCountry(isoCode)?.map(iCity => ({
        label: iCity.name,
        value: iCity.name,
        ...iCity
    }))
    return cities;
}

export function GetCountryCityInfo() {
    return Country.getAllCountries().map((iCountry) => ({
        label: iCountry.name,
        code: iCountry.isoCode,
        value: iCountry.name,
        ...iCountry
    }))
}