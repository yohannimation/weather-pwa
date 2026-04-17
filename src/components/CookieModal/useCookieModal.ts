import {
    setCookies,
} from '../LocalStorage/useSetter';

/**
 * Set cookies accepted in LocalStorage
 * @returns boolean
 */
export const cookiesAccepted = (): boolean => {
    if (!setCookies(true)) {
        window.dispatchEvent(new CustomEvent('app-error', {
            detail: { title: "Cookie error", message: "An error appear when cookies are set" }
        }));
        return false;
    } else {
        return true;
    }
}
