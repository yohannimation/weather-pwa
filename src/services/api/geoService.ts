import { triggerGlobalError } from "utils/errorUtils";
import { City } from "types";
import { loadUser, saveUser } from "services/storageService";
import { redirectToWeather } from "utils/redirectUtils";

/**
 * Fetch cities based on an input string from Open-Meteo Geocoding API
 * @param {string} inputValue
 * @returns Promise<City[] | null>
 */
export const searchCities = async (inputValue: string, signal?: AbortSignal): Promise<City[] | null> => {
    const language = loadUser().i18nextLng || 'en';
    const fetchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(inputValue)}&count=4&language=${language}&format=json`;

    try {
        const response = await fetch(fetchUrl, {
            ...(signal && { signal })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const jsonResponse = await response.json();
        return processGeoData(jsonResponse);
    } catch (error: any) {
        if (error.name === 'AbortError') {
            return null;
        }
        
        console.error("GeoService Error:", error);
        triggerGlobalError("Localization error", error.message || "We cannot get the city");
        throw error;
    }
}

/**
 * Processes raw geocoding response into typed City objects
 * @param {any} jsonResponse
 * @returns City[] | null
 */
const processGeoData = (jsonResponse: any): City[] | null => {
    if (!jsonResponse.results)
        return null;

    return jsonResponse.results.map((item: any): City => ({
        "id_city": item.id,
        "country_code": item.country_code,
        "name_city": item.name,
        "name_country": item.country,
        "timezone": item.timezone,
        "latitude": item.latitude,
        "longitude": item.longitude
    }));
}

/**
 * Persists selected city data to LocalStorage and redirects to home
 * @param {City} data
 */
export const saveSearchAndRedirect = (data: City): void => {
    saveUser({
        cityName: data.name_city,
        cityLatitude: data.latitude.toString(),
        cityLongitude: data.longitude.toString(),
        timezone: data.timezone,
    });

    redirectToWeather();
}
