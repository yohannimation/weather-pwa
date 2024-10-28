import { setCookies, setError, setErrorTitle, setErrorMessage } from '../LocalStorage/useSetter';

export const cookiesAccepted = () => {
    if (!setCookies(true)) {
        setError(true);
        setErrorTitle("Cookie error");
        setErrorMessage("An error appear when cookies are set");
    } else {
        return true;
    }
}