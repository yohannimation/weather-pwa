/**
 * Define the city name
 * @param {String} cityName
 * @returns boolean
 */
export const setCityName = (cityName) => {
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
export const setCookies = (isAccepted) => {
    if (typeof isAccepted == "boolean") {
        localStorage.setItem('cookies', isAccepted);
        return true;
    } else {
        return false;
    }
}

/**
 * Define the city coordinate
 * @param {float} latitude
 * @param {float} longitude
 * @returns boolean
*/
export const setCoordinates = (latitude, longitude) => {
    if (
        latitude !== null &&
        longitude !== null
    ) {
        localStorage.setItem('cityLatitude', latitude);
        localStorage.setItem('cityLongitude', longitude);
        return true;
    } else {
        return false;
    }
}

/**
 * Define if an error exist
 * @param {Boolean} error
 * @returns boolean
 */
export const setError = (error) => {
    if (typeof error == "boolean") {
        localStorage.setItem('error', error);
        return true;
    } else {
        return false;
    }
}

/**
 * Define an error title
 * @param {String} errorTitle
 * @returns boolean
 */
export const setErrorTitle = (errorTitle) => {
    if (typeof errorTitle == "string") {
        localStorage.setItem('errorTitle', errorTitle);
        return true;
    } else {
        return false;
    }
}

/**
 * Define an error message
 * @param {Boolean} errorMessage
 * @returns boolean
 */
export const setErrorMessage = (errorMessage) => {
    if (typeof errorMessage == "string") {
        localStorage.setItem('errorMessage', errorMessage);
        return true;
    } else {
        return false;
    }
}

/**
 * Define the user precipitation unit
 * @param {String} precipitationUnit
 * @returns boolean
 */
export const setPrecipitationUnit = (precipitationUnit) => {
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
 * @param {String} speedUnit
 * @returns boolean
 */
export const setSpeedUnit = (speedUnit) => {
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
 * @param {String} temperatureUnit
 * @returns boolean
 */
export const setTemperatureUnit = (temperatureUnit) => {
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
 * @param {String} timezone
 * @returns boolean
 */
export const setTimezone = (timezone) => {
    if (timezone !== null && timezone !== "") {
        localStorage.setItem('timezone', timezone);
        return true;
    } else {
        return false;
    }
}