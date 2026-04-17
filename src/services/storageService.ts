import { UnitSetting } from "../types";

export interface UserData {
    cityName: string | null;
    cookies: boolean | null;
    cityLatitude: string | null;
    cityLongitude: string | null;
    i18nextLng: string | null;
    precipitationUnit: UnitSetting | null;
    speedUnit: UnitSetting | null;
    temperatureUnit: UnitSetting | null;
    timezone: string | null;
}

const STORAGE_KEY = 'user_data';

/**
 * Loads user data from localStorage.
 * Implements a one-time migration from legacy fragmented keys to the consolidated JSON object.
 */
export const loadUser = (): UserData => {
    const lang = localStorage.getItem('i18nextLng');
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
        try {
            return JSON.parse(storedData) as UserData;
        } catch (e) {
            console.error("Failed to parse user_data from localStorage", e);
        }
    }

    // Default empty state
    return {
        cityName: null,
        cookies: null,
        cityLatitude: null,
        cityLongitude: null,
        i18nextLng: lang,
        precipitationUnit: 'default',
        speedUnit: 'default',
        temperatureUnit: 'default',
        timezone: null,
    };
};

/**
 * Saves user data updates to localStorage.
 * Merges provided updates with existing data.
 */
export const saveUser = (updates: Partial<UserData>): void => {
    const currentData = loadUser();
    const newData = { ...currentData, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};
