import { triggerGlobalError } from "utils/errorUtils";
import { redirectToWeather } from 'utils/redirectUtils';

import { useUser } from 'contexts/UserContext';

import { saveUser, loadUser } from 'services/storageService';

export const useInputSearchBar = () => {
    const { setLoading } = useUser();

    /**
     * Get coordinates of the user and set different cookies
     * @returns Promise<boolean>
     */
    const locateMe = async (): Promise<boolean> => {
        setLoading(true)

        return new Promise((resolve) => {
            // Check if the geolocation is available in the navigator
            if ("geolocation" in navigator) {
                // Ask the user to accept to use his GPS and get the coordinates
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const deviceLanguage = loadUser().i18nextLng || 'en';
                    let cityName: string;
                    let timezone: string;

                    // Set the API url to get the city name
                    const fetchUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${deviceLanguage}`;

                    // Fetching data
                    try {
                        const response = await fetch(fetchUrl);
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        const jsonResponse = await response.json();

                        cityName = jsonResponse.locality;
                        timezone = jsonResponse.localityInfo.informative[1].name;

                        saveUser({
                            cityName,
                            cityLatitude: latitude.toString(),
                            cityLongitude: longitude.toString(),
                            timezone,
                        });
                        redirectToWeather();
                        resolve(true);
                    } catch (error) {
                        setLoading(false)
                        triggerGlobalError("Fetch city data from coordinates", error instanceof Error ? error.message : "Unknown error")
                        resolve(false);
                    }
                },
                (error) => {
                    let message = "Unknown error";
                    switch (error.code) {
                        case 1: message = "Permission denied"; break;
                        case 2: message = "Position unavailable"; break;
                        case 3: message = "Timeout"; break;
                    }
                    
                    setLoading(false)
                    triggerGlobalError("Ask user permission to location", message)
                    resolve(false);
                });
            } else {
                setLoading(false)
                resolve(false);
            }
        })
    };

    return {
        locateMe,
    };
}
