import {
    setCookies,
    setError,
    setErrorTitle,
    setErrorMessage
} from '../LocalStorage/useSetter';

/**
 * Set cookies accepted in LocalStorage
 * @returns boolean
 */
export const cookiesAccepted = (): boolean => {
    if (!setCookies(true)) {
        setError(true);
        setErrorTitle("Cookie error");
        setErrorMessage("An error appear when cookies are set");
        return false;
    } else {
        return true;
    }
}
