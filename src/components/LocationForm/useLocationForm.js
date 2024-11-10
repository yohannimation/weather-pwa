import {
    setCityName,
    setCoordinates,
    setError,
    setErrorMessage,
    setErrorTitle
} from '../LocalStorage/useSetter';

import { getDeviceLanguage } from '../LocalStorage/useGetter'

/**
 * Get coordinates of the user and set different cookies
 * @returns bool
*/
export const locateMeTreatment = async () => {

    return new Promise((resolve) => {

        // Check if the geolocation is available in the navigator
        if ("geolocation" in navigator) {
            // Ask the user to accept to use his GPS and get the coordinates
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const deviceLanguage = getDeviceLanguage();
                var cityName;

                // Set the API url to get the city name
                const fetchUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + latitude + "&longitude=" + longitude + "&localityLanguage=" + deviceLanguage;

                // Fetching data
                try {
                    const response = await fetch(fetchUrl);
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    const jsonResponse = await response.json();

                    cityName = jsonResponse.locality;

                    setCityName(cityName);
                    setCoordinates(latitude, longitude);
                } catch (error) {
                    setError(true);
                    setErrorTitle("Fetch city data from coordinates");
                    setErrorMessage(error.message);

                    resolve(false);
                }

                resolve(true);
            },
            (error) => {
                setError(true);
                setErrorTitle("Ask user permission to location");

                switch (error.code) {
                    case 1:
                        setErrorMessage("Permission denied");
                        break;
                    case 2:
                        setErrorMessage("Position unavailable");
                        break;
                    case 3:
                        setErrorMessage("Timeout");
                        break;
                    default:
                        setErrorMessage("Unknown error");
                }

                resolve(false);
            });
        }
        
    });
}