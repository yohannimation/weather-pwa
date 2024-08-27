import { getCookies, getCoordinates, getCityName, getDeviceLanguage } from '../../components/LocalStorage/useGetter';

/**
 * Check if required cookies are set.
 * If not, it will redirect the user to the locate page
 * @returns nothing
 */
export const checkRequiredCookies = () => {
    const cookie = getCookies();
    const cityCoordinates = getCoordinates();
    const cityName = getCityName();
    const deviceLanguage = getDeviceLanguage();

    if (
        !cookie ||
        !cityCoordinates.latitude ||
        !cityCoordinates.longitude ||
        !cityName ||
        !deviceLanguage
    ) {
        // Redirect to `Locate` page, required data in local-storage are missing
        const origin = document.location.origin;
        document.location.href = origin + "/locate";
    }
}

/**
 * Fetch data for the current weather data.
 * @returns object
 */
export const getCurrentWeather = async () => {
    const { latitude, longitude } = getCoordinates();

    const fetchUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code&timezone=Europe%2FParis&models=meteofrance_seamless`;

    try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const jsonResponse = await response.json();

        if (
            jsonResponse !== undefined &&
            Object.keys(jsonResponse).length
        ) {
            return {
                "apparentTemperature": {
                    "value": jsonResponse.current.apparent_temperature,
                    "unit": jsonResponse.current_units.apparent_temperature
                },
                "isDay": {
                    "value": jsonResponse.current.is_day,
                    "unit": jsonResponse.current_units.is_day
                },
                "precipitation": {
                    "value": jsonResponse.current.precipitation,
                    "unit": jsonResponse.current_units.precipitation
                },
                "temperature": {
                    "value": jsonResponse.current.temperature_2m,
                    "unit": jsonResponse.current_units.temperature_2m
                },
                "weatherCode": {
                    "value": jsonResponse.current.weather_code,
                    "unit": jsonResponse.current_units.weather_code
                },
            }
        }
    } catch (error) {
        throw new Error(error);
    }

}