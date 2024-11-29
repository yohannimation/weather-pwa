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

            return {
                "time": getDateFormate(currentData.time),
                "temperature": currentData.temperature_2m + " " + currentUnit.temperature_2m,
                "apparentTemperature": currentData.apparent_temperature + " " + currentUnit.apparent_temperature,
                "precipitation": currentData.precipitation + " " + currentUnit.precipitation,
                "icon": getIconPath(currentData.weather_code, currentData.is_day, true),
                "weatherCode": currentData.weather_code,
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

            const hourlyDataToReturn = hourlyData.time.map((item, index) => {
                if (index >= currentHour && index <= 49 - currentHour) {
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
                            "icon": getIconPath(hourlyData.weather_code[index]),
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
    todayWeatherUrl.searchParams.append("daily", "temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant");
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
                    "name": "temperature_2m_max",
                    "icon": getIconPath("temperature_2m_max"),
                    "value": dailyData.temperature_2m_max[0] + " " + dailyUnit.temperature_2m_max
                },
                {
                    "name": "temperature_2m_min",
                    "icon": getIconPath("temperature_2m_min"),
                    "value": dailyData.temperature_2m_min[0] + " " + dailyUnit.temperature_2m_min
                },
                {
                    "name": "precipitation_probability_max",
                    "icon": getIconPath("precipitation_probability_max"),
                    "value": dailyData.precipitation_probability_max[0] + " " + dailyUnit.precipitation_probability_max
                },
                {
                    "name": "sunrise",
                    "icon": getIconPath("sunrise"),
                    "value": dailyData.sunrise[0].split("T")[1]
                },
                {
                    "name": "sunset",
                    "icon": getIconPath("sunset"),
                    "value": dailyData.sunset[0].split("T")[1]
                },
                {
                    "name": "uv_index_max",
                    "icon": getIconPath("uv_index_max"),
                    "value": dailyData.uv_index_max[0] ? dailyData.uv_index_max[0] : null
                },
                {
                    "name": "wind_speed_10m_max",
                    "icon": getIconPath("wind_speed_10m_max"),
                    "value": dailyData.wind_speed_10m_max[0] + " " + dailyUnit.wind_speed_10m_max
                },
                {
                    "name": "wind_direction_10m_dominant",
                    "icon": getIconPath("wind_direction_10m_dominant"),
                    "value": dailyData.wind_direction_10m_dominant[0] + " " + dailyUnit.wind_direction_10m_dominant
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
                        "icon": getIconPath(weeklyData.weather_code[index]),
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

const getIconPath = (code, isDay = true, isStatic = true) => {
    const animateOrStaticPath = isStatic ? "" : "animate/";
    const dayOrNightPath = isDay ? "day/" : "night/";
    const iconPath = "/icon/" + animateOrStaticPath + dayOrNightPath;

    if (Number.isInteger(code)) {
        switch(code) {
            case 0 :
                return iconPath + "clear";

            case 1 :
            case 2 :
            case 3 :
                return iconPath + "cloudly";

            case 45 :
            case 48 :
                return iconPath + "fogy";
            
            case 51 :
            case 53 :
            case 55 :
            case 56 :
            case 57 :
            case 61 :
            case 63 :
            case 65 :
            case 66 :
            case 67 :
            case 80 :
            case 81 :
            case 82 :
                return iconPath + "rainy";
            
            case 71 :
            case 73 :
            case 75 :
            case 77 :
            case 85 :
            case 86 :
                return iconPath + "snowy";

            case 95 :
            case 96 :
            case 99 :
                return iconPath + "thunderstorm";
            
            default :
                return iconPath + "unknown";
        }
    } else {
        return iconPath + code;
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