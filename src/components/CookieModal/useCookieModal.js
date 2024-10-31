import {
    setCookies,
    setError,
    setErrorTitle,
    setErrorMessage
} from '../LocalStorage/useSetter';

/**
 * Set cookies accepted
 * @returns bool
 */
export const cookiesAccepted = () => {
    if (!setCookies(true)) {
        setError(true);
        setErrorTitle("Cookie error");
        setErrorMessage("An error appear when cookies are set");
        return false;
    } else {
        return true;
    }
}