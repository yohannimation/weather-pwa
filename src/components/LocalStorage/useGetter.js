/**
 * Get city name selected by user
 * @returns string
 */
export const getCityName = () => {
    return localStorage.getItem('cityName');
}

/**
 * Get if cookies are accept or not
 * @returns boolean
 */
export const getCookies = () => {
    return localStorage.getItem('cookies');
}

/**
 * Get coordinates of the city selected
 * @returns object {latitude, longitude}
*/
export const getCoordinates = () => {
    return {
        "latitude": localStorage.getItem('cityLatitude'),
        "longitude": localStorage.getItem('cityLongitude')
    };
}

/**
 * Get device language
 * @returns string
*/
export const getDeviceLanguage = () => {
    return localStorage.getItem('i18nextLng');
}

/**
 * Get if an error exist
 * @returns bool
 */
export const getError = () => {
    return localStorage.getItem('error');
}

/**
 * Get error title
 * @returns string
 */
export const getErrorTitle = () => {
    return localStorage.getItem('errorTitle');
}

/**
 * Get error message
 * @returns string
 */
export const getErrorMessage = () => {
    return localStorage.getItem('errorMessage');
}

/**
 * Get the user precipitation unit
 * @returns string
 */
export const getPrecipitationUnit = () => {
    return localStorage.getItem('precipitationUnit');
}

/**
 * Get the user speed unit
 * @returns string
 */
export const getSpeedUnit = () => {
    return localStorage.getItem('speedUnit');
}

/**
 * Get the user temperature unit
 * @returns string
 */
export const getTemperatureUnit = () => {
    return localStorage.getItem('temperatureUnit');
}

/**
 * Get the timezone used by the user
 * @returns string
 */
export const getTimezone = () => {
    return localStorage.getItem('timezone');
}