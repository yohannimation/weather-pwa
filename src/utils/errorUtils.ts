/**
 * Dispatches a global 'app-error' event to trigger the ErrorPopup component
 * via the ErrorProvider.
 *
 * @param title The title of the error popup
 * @param message The descriptive message to show in the popup
 */
export const triggerGlobalError = (title: string, message: string): void => {
    window.dispatchEvent(new CustomEvent('app-error', {
        detail: { title, message }
    }));
};
