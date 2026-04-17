import { getError } from '../LocalStorage/useGetter';
import { setError, setErrorTitle, setErrorMessage } from '../LocalStorage/useSetter';

/**
 * Check if an error exists in LocalStorage
 * @returns string | null
 */
export const checkError = (): string | null => {
    return getError();
}

/**
 * Reset error state and reload the page
 */
export const reloadTrigger = (): void => {
    setError(false);
    setErrorTitle("");
    setErrorMessage("");
    window.location.reload();
}
