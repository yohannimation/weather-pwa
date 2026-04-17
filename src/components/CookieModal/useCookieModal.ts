import { saveUser } from '../../services/storageService';

/**
 * Set cookies accepted in LocalStorage
 * @returns boolean
 */
export const cookiesAccepted = (): boolean => {
    try {
        saveUser({ cookies: true });
        return true;
    } catch (e) {
        window.dispatchEvent(new CustomEvent('app-error', {
            detail: { title: "Cookie error", message: "An error appear when cookies are set" }
        }));
        return false;
    }
}
