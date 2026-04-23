import { useUser } from '../../contexts/UserContext';

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
            window.dispatchEvent(new CustomEvent('app-error', {
                detail: { title: "Cookie error", message: "An error appear when cookies are set" }
            }));
        }
    };

    return {
        checkCookiesAccepted,
        acceptCookies,
    };
};
