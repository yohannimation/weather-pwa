import { getDeviceLanguage } from "../../LocalStorage/useGetter";

export const requester = async (inputValue) => {
    const fetchUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + inputValue + "&count=4&language=" + getDeviceLanguage() + "&format=json";

    try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const jsonResponse = await response.json();

        return processData(jsonResponse);
    } catch (error) {
        throw new Error(error);
    }
}

const processData = (jsonResponse) => {
    if (!jsonResponse.results)
        return null;
    
    return jsonResponse.results.map((item) => {
        return {
            "id_city": item.id,
            "country_code": item.country_code,
            "name_city": item.name,
            "name_country": item.country,
            "timezone": item.timezone,
            "latitude": item.latitude,
            "longitude": item.longitude
        };
    });
}

export const saveSearch = (data) => {
    console.log(data)
}