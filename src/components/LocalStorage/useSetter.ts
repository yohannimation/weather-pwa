import { UnitSetting } from "../../types";

/**
 * Define the city name
 * @param {string} cityName
 * @returns boolean
 */
export const setCityName = (cityName: string): boolean => {
    if (cityName !== null && cityName !== "") {
        localStorage.setItem('cityName', cityName);
        return true;
    } else {
        return false;
    }
}

/**
 * Define if cookies are accept or not
 * @param {boolean} isAccepted
 * @returns boolean
*/
export const setCookies = (isAccepted: boolean): boolean => {
    if (typeof isAccepted === "boolean") {
        localStorage.setItem('cookies', String(isAccepted));
        return true;
    } else {
        return false;
    }
}

/**
 * Define the city coordinate
 * @param {number | string} latitude
 * @param {number | string} longitude
 * @returns boolean
*/
export const setCoordinates = (latitude: number | string, longitude: number | string): boolean => {
    if (
        latitude !== null &&
        longitude !== null
    ) {
        localStorage.setItem('cityLatitude', latitude.toString());
        localStorage.setItem('cityLongitude', longitude.toString());
        return true;
    } else {
        return false;
    }
}

/**
 * Define if an error exist
 * @param {boolean} error
 * @returns boolean
 */
export const setError = (error: boolean): boolean => {
    if (typeof error === "boolean") {
        localStorage.setItem('error', String(error));
        return true;
    } else {
        return false;
    }
}

/**
 * Define an error title
 * @param {string} errorTitle
 * @returns boolean
 */
export const setErrorTitle = (errorTitle: string): boolean => {
    if (typeof errorTitle === "string") {
        localStorage.setItem('errorTitle', errorTitle);
        return true;
    } else {
        return false;
    }
}

/**
 * Define an error message
 * @param {string} errorMessage
 * @returns boolean
 */
export const setErrorMessage = (errorMessage: string): boolean => {
    if (typeof errorMessage === "string") {
        localStorage.setItem('errorMessage', errorMessage);
        return true;
    } else {
        return false;
    }
}

/**
 * Define the user precipitation unit
 * @param {UnitSetting} precipitationUnit
 * @returns boolean
 */
export const setPrecipitationUnit = (precipitationUnit: UnitSetting): boolean => {
    if (
        precipitationUnit === "default" ||
        precipitationUnit === "secondary"
    ) {
        localStorage.setItem('precipitationUnit', precipitationUnit);
        return true;
    } else {
        return false;
    }
}

/**
 * Define the user speed unit
 * @param {UnitSetting} speedUnit
 * @returns boolean
 */
export const setSpeedUnit = (speedUnit: UnitSetting): boolean => {
    if (
        speedUnit === "default" ||
        speedUnit === "secondary"
    ) {
        localStorage.setItem('speedUnit', speedUnit);
        return true;
    } else {
        return false;
    }
}

/**
 * Define the user temperature unit
 * @param {UnitSetting} temperatureUnit
 * @returns boolean
 */
export const setTemperatureUnit = (temperatureUnit: UnitSetting): boolean => {
    if (
        temperatureUnit === "default" ||
        temperatureUnit === "secondary"
    ) {
        localStorage.setItem('temperatureUnit', temperatureUnit);
        return true;
    } else {
        return false;
    }
}

/**
 * Define the timezone used by the user
 * @param {string} timezone
 * @returns boolean
 */
export const setTimezone = (timezone: string): boolean => {
    if (timezone !== null && timezone !== "") {
        localStorage.setItem('timezone', timezone);
        return true;
    } else {
        return false;
    }
}
