import { UnitSetting } from "../../types";

/**
 * Get city name selected by user
 * @returns string | null
 */
export const getCityName = (): string | null => {
    return localStorage.getItem('cityName');
}

/**
 * Get if cookies are accept or not
 * @returns string | null
 */
export const getCookies = (): string | null => {
    return localStorage.getItem('cookies');
}

/**
 * Get coordinates of the city selected
 * @returns {latitude: string | null, longitude: string | null}
 */
export const getCoordinates = (): { latitude: string | null; longitude: string | null } => {
    return {
        "latitude": localStorage.getItem('cityLatitude'),
        "longitude": localStorage.getItem('cityLongitude')
    };
}

/**
 * Get device language
 * @returns string | null
 */
export const getDeviceLanguage = (): string | null => {
    return localStorage.getItem('i18nextLng');
}

/**
 * Get if an error exist
 * @returns string | null
 */
export const getError = (): string | null => {
    return localStorage.getItem('error');
}

/**
 * Get error title
 * @returns string | null
 */
export const getErrorTitle = (): string | null => {
    return localStorage.getItem('errorTitle');
}

/**
 * Get error message
 * @returns string | null
 */
export const getErrorMessage = (): string | null => {
    return localStorage.getItem('errorMessage');
}

/**
 * Get the user precipitation unit
 * @returns UnitSetting | null
 */
export const getPrecipitationUnit = (): UnitSetting | null => {
    return localStorage.getItem('precipitationUnit') as UnitSetting | null;
}

/**
 * Get the user speed unit
 * @returns UnitSetting | null
 */
export const getSpeedUnit = (): UnitSetting | null => {
    return localStorage.getItem('speedUnit') as UnitSetting | null;
}

/**
 * Get the user temperature unit
 * @returns UnitSetting | null
 */
export const getTemperatureUnit = (): UnitSetting | null => {
    return localStorage.getItem('temperatureUnit') as UnitSetting | null;
}

/**
 * Get the timezone used by the user
 * @returns string | null
 */
export const getTimezone = (): string | null => {
    return localStorage.getItem('timezone');
}
