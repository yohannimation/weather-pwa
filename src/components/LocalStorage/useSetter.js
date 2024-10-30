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
 * Define the coordinate
 * @param {float} latitude
 * @param {float} longitude
 * @returns boolean
 */
export const setCoordinate = (latitude, longitude) => {
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
 * Define the city name
 * @param {String} cityName
 * @returns boolean
 */
export const setCityName = (cityName) => {
    localStorage.setItem('cityName', cityName);
    return true;
}

/**
 * Define the timezone
 * @param {String} timezone
 * @returns boolean
 */
export const setTimezone = (timezone) => {
    localStorage.setItem('timezone', timezone);
    return true;
}

/**
 * Define precipitation unit
 * @param {String} precipitationUnit
 * @returns boolean
 */
export const setPrecipitationUnit = (precipitationUnit) => {
    if (precipitationUnit !== null) {
        localStorage.setItem('precipitationUnit', precipitationUnit);
        return true;
    } else {
        return false;
    }
}

/**
 * Define speed unit
 * @param {String} speedUnit
 * @returns boolean
 */
export const setSpeedUnit = (speedUnit) => {
    if (speedUnit !== null) {
        localStorage.setItem('speedUnit', speedUnit);
        return true;
    } else {
        return false;
    }
}

/**
 * Define temperature unit
 * @param {String} temperatureUnit
 * @returns boolean
 */
export const setTemperatureUnit = (temperatureUnit) => {
    if (temperatureUnit !== null) {
        localStorage.setItem('temperatureUnit', temperatureUnit);
        return true;
    } else {
        return false;
    }
}

/**
 * Define the last request time
 * @param {String} lastRequestTime
 * @returns boolean
 */
export const setLastRequestTime = (lastRequestTime) => {
    localStorage.setItem('lastRequestTime', lastRequestTime);
    return true;
}

/**
 * Define if an error exist
 * @param {Boolean} error
 * @returns boolean
 */
export const setError = (error) => {
    localStorage.setItem('error', error);
    return true;
}

/**
 * Define an error title
 * @param {String} errorTitle
 * @returns boolean
 */
export const setErrorTitle = (errorTitle) => {
    localStorage.setItem('errorTitle', errorTitle);
    return true;
}

/**
 * Define an error message
 * @param {Boolean} errorMessage
 * @returns boolean
 */
export const setErrorMessage = (errorMessage) => {
    localStorage.setItem('errorMessage', errorMessage);
    return true;
}