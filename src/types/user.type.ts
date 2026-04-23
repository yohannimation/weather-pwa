import type { UnitSetting } from "./unit.type"

export interface UserPreferences {
    precipitationUnit: UnitSetting;
    speedUnit: UnitSetting;
    temperatureUnit: UnitSetting;
    language: string;
    cookiesAccepted: boolean;
}

export interface UserLocationState {
    cityName: string;
    latitude: string;
    longitude: string;
    timezone: string;
}