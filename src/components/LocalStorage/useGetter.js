/**
 * Get if cookies are accept or not
 * @returns boolean
 */
export const getCookies = () => {
    return localStorage.getItem('cookies');
}

/**
 * Get device language
 * @returns string
 */
export const getDeviceLanguage = () => {
    return localStorage.getItem('i18nextLng');
}