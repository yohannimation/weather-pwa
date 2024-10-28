import { getError } from '../LocalStorage/useGetter';
import { setError, setErrorTitle, setErrorMessage } from '../LocalStorage/useSetter';

/**
 * LocalStorage structure
 *      error bool
 *      errorTitle string
 *      errorMessage string
 */

export const checkError = () => {
    return getError();
}

export const reloadTrigger = () => {
    setError(false);
    setErrorTitle("");
    setErrorMessage("");
    window.location.reload();
}