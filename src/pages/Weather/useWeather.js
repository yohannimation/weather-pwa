import {
    getCityName,
    getCookies,
    getCoordinates,
    getDeviceLanguage,
    getPrecipitationUnit,
    getSpeedUnit,
    getTemperatureUnit,
    getTimezone
} from '../../components/LocalStorage/useGetter';

// Define user variables
const cityName = getCityName();
const cookie = getCookies();
const { latitude, longitude } = getCoordinates();
const deviceLanguage = getDeviceLanguage();
const precipitationUnit = getPrecipitationUnit() === "default" ? "mm" : "inch";
const speedUnit = getSpeedUnit() === "default" ? "kmh" : "mph";
const temperatureUnit = getTemperatureUnit() === "default" ? "celsius" : "fahrenheit";
const timezone = getTimezone();

let baseUrl = "https://api.open-meteo.com/v1/forecast";
let baseRequestUrl = new URL("?", baseUrl);

/**
 * Check if required cookies are set.
 * If not, it will redirect the user to the locate page
 * @returns void
 */
export const checkRequiredCookies = () => {
    if (
        !cityName ||
        !cookie ||
        !latitude ||
        !longitude ||
        !deviceLanguage ||
        !timezone
    ) {
        // Redirect to `Locate` page, required data in local-storage are missing
        window.location.href = '/locate';
    }
}

/**
 * Set the background-color defined by the weather code
 * @returns Object
 */
export const defaultBackgroundColorTreatment = (weatherCode, isDay) => {
    if (weatherCode > 3) {
        // Weather code for raining
        return ({backgroundColor: "var(--rain-first-color)"});
    } else {
        if (isDay) {
            // Weather code for day and clear sky
            return ({backgroundColor: "var(--day-first-color)"});
        } else {
            // Weather code for night and clear sky
            return ({backgroundColor: "var(--night-first-color)"});
        }
    }
}

/**
 * Fetch data for for all weather data
 * (Current, Hourly, Today, Weekly)
 * @return object
 */
export const getWeatherData = async () => {
    const currentWeatherPromise = new Promise((resolve) => {
        resolve(
            getCurrentWeather()
        );
    });

    const hourlyWeatherPromise = new Promise((resolve) => {
        resolve(
            getHourlyWeather()
        );
    });

    const todayWeatherPromise = new Promise((resolve) => {
        resolve(
            getTodayWeather()
        );
    })

    const weeklyWeatherPromise = new Promise((resolve) => {
        resolve(
            getWeeklyWeather()
        );
    });
    
    const values = await Promise.all([
        currentWeatherPromise,
        hourlyWeatherPromise,
        todayWeatherPromise,
        weeklyWeatherPromise
    ]);
    return values;
}

/**
 * Fetch data for the current weather data.
 * @returns object
 */
const getCurrentWeather = async () => {
    const currentWeatherUrl = new URL(baseRequestUrl);

    currentWeatherUrl.searchParams.append("latitude", latitude);
    currentWeatherUrl.searchParams.append("longitude", longitude);
    currentWeatherUrl.searchParams.append("current", "temperature_2m,apparent_temperature,is_day,precipitation,weather_code");
    currentWeatherUrl.searchParams.append("timezone", timezone);
    currentWeatherUrl.searchParams.append("temperature_unit", temperatureUnit);
    currentWeatherUrl.searchParams.append("wind_speed_unit", speedUnit);
    currentWeatherUrl.searchParams.append("precipitation_unit", precipitationUnit);
    currentWeatherUrl.searchParams.append("models", "meteofrance_seamless");

    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const jsonResponse = await response.json();

        // Data treatment
        if (
            jsonResponse !== undefined &&
            Object.keys(jsonResponse).length
        ) {
            const currentData = jsonResponse.current;
            const currentUnit = jsonResponse.current_units;


            const cloudyCodeArray = [1, 2, 3];
            const fogyCodeArray = [45, 48];
            const rainyCodeArray = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];
            const snowyCodeArray = [71, 73, 75, 77, 85, 86];
            const thunderstormCodeArray = [95, 96, 99];
            var codeName;
            if (currentData.weather_code === 0)
                codeName = "clear";
    
            if (cloudyCodeArray.includes(currentData.weather_code))
                codeName = "cloudy";
    
            if (fogyCodeArray.includes(currentData.weather_code))
                codeName = "fogy";
    
            if (rainyCodeArray.includes(currentData.weather_code))
                codeName = "rainy";
    
            if (snowyCodeArray.includes(currentData.weather_code))
                codeName = "snowy";
    
            if (thunderstormCodeArray.includes(currentData.weather_code))
                codeName = "thunderstorm";

            console.log(codeName)

            return {
                "time": getDateFormate(currentData.time),
                "temperature": currentData.temperature_2m + " " + currentUnit.temperature_2m,
                "apparentTemperature": currentData.apparent_temperature + " " + currentUnit.apparent_temperature,
                "precipitation": currentData.precipitation + " " + currentUnit.precipitation,
                "icon": "weatherIcon=" + currentData.weather_code + "_isDay=" + currentData.is_day + "_isAnimate=true",
                "weatherCode": currentData.weather_code,
                "codeName": codeName,
                "isDay": currentData.is_day
            }
        } else {
            throw new Error("API didn't get current weather data");
        }
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Fetch data for the hourly weather data.
 * @returns object
 */
const getHourlyWeather = async () => {
    const hourlyWeatherUrl = new URL(baseRequestUrl);

    hourlyWeatherUrl.searchParams.append("latitude", latitude);
    hourlyWeatherUrl.searchParams.append("longitude", longitude);
    hourlyWeatherUrl.searchParams.append("hourly", "temperature_2m,precipitation,weather_code,is_day");
    hourlyWeatherUrl.searchParams.append("timezone", timezone);
    hourlyWeatherUrl.searchParams.append("temperature_unit", temperatureUnit);
    hourlyWeatherUrl.searchParams.append("wind_speed_unit", speedUnit);
    hourlyWeatherUrl.searchParams.append("precipitation_unit", precipitationUnit);
    hourlyWeatherUrl.searchParams.append("models", "meteofrance_seamless");
    hourlyWeatherUrl.searchParams.append("forecast_days", 2);

    try {
        const response = await fetch(hourlyWeatherUrl);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const jsonResponse = await response.json();

        // Data treatment
        if (
            jsonResponse !== undefined &&
            Object.keys(jsonResponse).length
        ) {
            const currentHour = new Date().getHours();
            const hourlyData = jsonResponse.hourly;
            const hourlyUnit = jsonResponse.hourly_units;
            var lastTemperature;

            // An iterable variable. If its count is > 24 it return null
            var indexWithLimit = 0;

            // The item is the hour
            const hourlyDataToReturn = hourlyData.time.map((item, index) => {

                // If the index >= to the current hour, the data will be display
                if (index >= currentHour) {

                    indexWithLimit++;
                    if (indexWithLimit > 24) {
                        return null
                    }

                    // Define the temperature variation (rise, equal, down)
                    var temperatureVariation;
                    if (lastTemperature < hourlyData.temperature_2m[index]) {
                        temperatureVariation = "rise";
                    }
                    if (lastTemperature > hourlyData.temperature_2m[index]) {
                        temperatureVariation = "down";
                    }
                    if (lastTemperature === hourlyData.temperature_2m[index]) {
                        temperatureVariation = "equal";
                    }
                    lastTemperature = hourlyData.temperature_2m[index];

                    return (
                        {
                            "time": item.split("T")[1],
                            "icon": "weatherIcon=" + hourlyData.weather_code[index] + "_isDay=" +  hourlyData.is_day[index] + "_isAnimate=false",
                            "temperature": {
                                "variation": temperatureVariation,
                                "value": hourlyData.temperature_2m[index] + " " + hourlyUnit.temperature_2m
                            },
                            "precipitation": hourlyData.precipitation[index] + " " + hourlyUnit.precipitation,
                            "isDay": hourlyData.is_day[index],
                            "weatherCode": hourlyData.weather_code[index],
                        }
                    )
                } else {
                    return null;
                }
            })
            .filter(x => x !== null);

            return hourlyDataToReturn;
        } else {
            throw new Error("API didn't get hourly weather data");
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getTodayWeather = async () => {
    const todayWeatherUrl = new URL(baseRequestUrl);

    todayWeatherUrl.searchParams.append("latitude", latitude);
    todayWeatherUrl.searchParams.append("longitude", longitude);
    todayWeatherUrl.searchParams.append("timezone", timezone);
    todayWeatherUrl.searchParams.append("daily", "temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_mean,wind_speed_10m_max,wind_direction_10m_dominant");
    todayWeatherUrl.searchParams.append("temperature_unit", temperatureUnit);
    todayWeatherUrl.searchParams.append("wind_speed_unit", speedUnit);
    todayWeatherUrl.searchParams.append("precipitation_unit", precipitationUnit);
    todayWeatherUrl.searchParams.append("models", "meteofrance_seamless");
    todayWeatherUrl.searchParams.append("forecast_days", 1);

    try {
        const response = await fetch(todayWeatherUrl);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const jsonResponse = await response.json();

        // Data treatment
        if (
            jsonResponse !== undefined &&
            Object.keys(jsonResponse).length
        ) {
            const dailyData = jsonResponse.daily;
            const dailyUnit = jsonResponse.daily_units;

            return [
                {
                    "left": {
                        "name": "temperature_2m_min",
                        "icon": "minTemp",
                        "value": dailyData.temperature_2m_min[0] + " " + dailyUnit.temperature_2m_min
                    },
                    "right": {
                        "name": "temperature_2m_max",
                        "icon": "maxTemp",
                        "value": dailyData.temperature_2m_max[0] + " " + dailyUnit.temperature_2m_max
                    }
                },
                {
                    "left": {
                        "name": "sunrise",
                        "icon": "sunrise",
                        "value": dailyData.sunrise[0].split("T")[1]
                    },
                    "right": {
                        "name": "sunset",
                        "icon": "sunset",
                        "value": dailyData.sunset[0].split("T")[1]
                    }
                },
                {
                    "left": {
                        "name": "uv_index_max",
                        "icon": "uvIndex",
                        "value": dailyData.uv_index_max[0] ?? 0
                    },
                    "right": {
                        "name": "precipitation_probability_mean",
                        "icon": "precipitationProbability",
                        "value": dailyData.precipitation_probability_mean[0] + " " + dailyUnit.precipitation_probability_mean
                    }
                },
                {
                    "left": {
                        "name": "wind_speed_10m_max",
                        "icon": "windSpeed",
                        "value": dailyData.wind_speed_10m_max[0] + " " + dailyUnit.wind_speed_10m_max
                    },
                    "right": {
                        "name": "wind_direction_10m_dominant",
                        "icon": "windDirection",
                        "value": dailyData.wind_direction_10m_dominant[0] + " " + dailyUnit.wind_direction_10m_dominant
                    }
                }
            ]
        } else {
            throw new Error("API didn't get today weather data");
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getWeeklyWeather = async () => {
    const weeklyWeatherUrl = new URL(baseRequestUrl);
    const todayDate = new Date();
    const startDate = new Date(todayDate);
    const endDate = new Date(todayDate);
    startDate.setDate(todayDate.getDate() + 1);
    endDate.setDate(todayDate.getDate() + 7);

    weeklyWeatherUrl.searchParams.append("latitude", latitude);
    weeklyWeatherUrl.searchParams.append("longitude", longitude);
    weeklyWeatherUrl.searchParams.append("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max");
    weeklyWeatherUrl.searchParams.append("timezone", timezone);
    weeklyWeatherUrl.searchParams.append("temperature_unit", temperatureUnit);
    weeklyWeatherUrl.searchParams.append("wind_speed_unit", speedUnit);
    weeklyWeatherUrl.searchParams.append("precipitation_unit", precipitationUnit);
    weeklyWeatherUrl.searchParams.append("models", "best_match");
    weeklyWeatherUrl.searchParams.append("start_date", startDate.toISOString().split("T")[0]);
    weeklyWeatherUrl.searchParams.append("end_date", endDate.toISOString().split("T")[0]);

    try {
        const response = await fetch(weeklyWeatherUrl);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const jsonResponse = await response.json();

        // Data treatment
        if (
            jsonResponse !== undefined &&
            Object.keys(jsonResponse).length
        ) {
            const weeklyData = jsonResponse.daily;
            const weeklyUnit = jsonResponse.daily_units;

            const weeklyDataToReturn = weeklyData.time.map((item, index) => {
                return (
                    {
                        "day": getWeekdayName(item),
                        "icon": "weatherIcon=" + weeklyData.weather_code[index] + "_isDay=true_isAnimate=false",
                        "temperature": {
                            "max": weeklyData.temperature_2m_max[index] + " " + weeklyUnit.temperature_2m_max,
                            "min": weeklyData.temperature_2m_min[index] + " " + weeklyUnit.temperature_2m_min
                        },
                        "precipitation": {
                            "probability": weeklyData.precipitation_probability_max[index] + " " + weeklyUnit.precipitation_probability_max,
                            "maximumValue": weeklyData.precipitation_sum[index] + " " + weeklyUnit.precipitation_sum
                        }
                    }
                )
            });

            return weeklyDataToReturn;
        } else {
            throw new Error("API didn't get hourly weather data");
        }
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Format the date and hour in a format defined by the device language
 * (for exemple dd/mm/yyyy, hh:ii)
 * @param {string} input 
 * @returns string
 */
const getDateFormate = (input) => {
    const date = new Date(input);

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Utilise le format 24 heures
    };
    
    return new Intl.DateTimeFormat(deviceLanguage, options).format(date);
}

const getWeekdayName = (input) => {
    const date = new Date(input);

    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat(deviceLanguage, options).format(date);
}