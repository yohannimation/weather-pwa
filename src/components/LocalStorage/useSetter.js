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
 * Define the units
 * @param {Object} units
 * @returns boolean
 */
export const setUnits = (units) => {
    if (
        typeof units === 'object' &&
        "temperatureUnit" in units &&
        "precipitationUnit" in units &&
        "speedUnit" in units &&
        units.temperatureUnit !== null &&
        units.precipitationUnit !== null &&
        units.speedUnit !== null
    ) {
        localStorage.setItem('units', units);
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