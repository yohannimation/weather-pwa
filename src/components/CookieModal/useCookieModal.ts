import { triggerGlobalError } from "utils/errorUtils";

import { useUser } from 'contexts/UserContext';

/**
 * Hook to manage cookie acceptance
 */
export const useCookieModal = () => {
    const { user, updateUser } = useUser();

    /**
     * Check if cookies have been accepted
     * @returns boolean
     */
    const checkCookiesAccepted = (): boolean => {
        return !!user.cookies;
    };

    /**
     * Set cookies as accepted in UserContext
     */
    const acceptCookies = (): void => {
        try {
            updateUser({ cookies: true });
        } catch (e) {
            triggerGlobalError("Cookie error", "An error appear when cookies are set");
        }
    };

    return {
        checkCookiesAccepted,
        acceptCookies,
    };
};
