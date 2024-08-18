import { getDeviceLanguage } from "../LocalStorage/useGetter";

export const getCityData = async (cityName) => {
    const fetchUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + cityName + "&count=4&language=" + getDeviceLanguage() + "&format=json";

    try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const jsonResponse = await response.json();
        return jsonResponse.results;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCountryFlag = async () => {

}