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
 * Get city name selected by user
 * @returns string
 */
export const getCityName = () => {
    return localStorage.getItem('cityName');
}

/**
 * Get device language
 * @returns string
 */
export const getDeviceLanguage = () => {
    return localStorage.getItem('i18nextLng');
}