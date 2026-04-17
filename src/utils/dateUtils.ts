import { getDeviceLanguage } from "../components/LocalStorage/useGetter";

/**
 * Format the date and hour in a format defined by the device language
 * @param {string} input
 * @returns string
 */
export const getDateFormate = (input: string): string => {
    const date = new Date(input);

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Utilise le format 24 heures
    };

    return new Intl.DateTimeFormat(getDeviceLanguage() || 'en-US', options).format(date);
}

/**
 * Get the formatted weekday name based on the device language
 * @param {string} input
 * @returns string
 */
export const getWeekdayName = (input: string): string => {
    const date = new Date(input);

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return new Intl.DateTimeFormat(getDeviceLanguage() || 'en-US', options).format(date);
}
