import {
    CurrentWeather,
    HourlyWeather,
    WeeklyWeather,
    TodayWeatherPair
} from "../../types";
import { loadUser } from "../../services/storageService";
import { getDateFormate, getWeekdayName } from "../../utils/dateUtils";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Orchestrates the fetching of all weather data needed for the dashboard
 * @returns Promise<[CurrentWeather, HourlyWeather[], TodayWeatherPair[], WeeklyWeather[]]>
 */
export const getWeatherData = async (): Promise<[CurrentWeather, HourlyWeather[], TodayWeatherPair[], WeeklyWeather[]]> => {
    const [current, hourly, today, weekly] = await Promise.all([
        getCurrentWeather(),
        getHourlyWeather(),
        getTodayWeather(),
        getWeeklyWeather()
    ]);
    return [current, hourly, today, weekly];
}

const getWeatherSettings = () => {
    const user = loadUser();
    const { cityLatitude: latitude, cityLongitude: longitude, timezone } = user;

    if (!latitude || !longitude || !timezone) {
        window.location.href = '/locate';
        throw new Error('Missing location or timezone information. Redirecting to /locate.');
    }

    return {
        latitude,
        longitude,
        timezone,
        tempUnit: user.temperatureUnit === "default" ? "celsius" : "fahrenheit",
        speedUnit: user.speedUnit === "default" ? "kmh" : "mph",
        precipitationUnit: user.precipitationUnit === "default" ? "mm" : "inch",
    };
};

const getCurrentWeather = async (): Promise<CurrentWeather> => {
    const { latitude, longitude, timezone, tempUnit, speedUnit, precipitationUnit } = getWeatherSettings();

    const url = new URL(BASE_URL);
    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
    url.searchParams.append("current", "temperature_2m,apparent_temperature,is_day,precipitation,weather_code");
    url.searchParams.append("timezone", timezone);
    url.searchParams.append("temperature_unit", tempUnit);
    url.searchParams.append("wind_speed_unit", speedUnit);
    url.searchParams.append("precipitation_unit", precipitationUnit);
    url.searchParams.append("models", "meteofrance_seamless");

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();

    if (!json.current) throw new Error("API didn't get current weather data");

    const currentData = json.current;
    const currentUnit = json.current_units;
    const code = currentData.weather_code;

    let codeName: CurrentWeather['codeName'] = 'clear';
    if ([1, 2, 3].includes(code)) codeName = 'cloudy';
    else if ([45, 48].includes(code)) codeName = 'fogy';
    else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) codeName = 'rainy';
    else if ([71, 73, 75, 77, 85, 86].includes(code)) codeName = 'snowy';
    else if ([95, 96, 99].includes(code)) codeName = 'thunderstorm';

    return {
        time: getDateFormate(currentData.time),
        temperature: `${currentData.temperature_2m} ${currentUnit.temperature_2m}`,
        apparentTemperature: `${currentData.apparent_temperature} ${currentUnit.apparent_temperature}`,
        precipitation: `${currentData.precipitation} ${currentUnit.precipitation}`,
        icon: `weatherIcon=${code}_isDay=${currentData.is_day}_isAnimate=true`,
        weatherCode: code,
        codeName: codeName,
        isDay: currentData.is_day
    };
}

const getHourlyWeather = async (): Promise<HourlyWeather[]> => {
    const { latitude, longitude, timezone, tempUnit, speedUnit, precipitationUnit } = getWeatherSettings();

    const url = new URL(BASE_URL);
    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
    url.searchParams.append("hourly", "temperature_2m,precipitation,weather_code,is_day");
    url.searchParams.append("timezone", timezone);
    url.searchParams.append("temperature_unit", tempUnit);
    url.searchParams.append("wind_speed_unit", speedUnit);
    url.searchParams.append("precipitation_unit", precipitationUnit);
    url.searchParams.append("models", "meteofrance_seamless");
    url.searchParams.append("forecast_days", "2");

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();

    if (!json.hourly) throw new Error("API didn't get hourly weather data");

    const currentHour = new Date().getHours();
    const hourly = json.hourly;
    const units = json.hourly_units;
    let lastTemp: number | undefined;

    return hourly.time
        .map((time: string, index: number) => {
            if (index < currentHour) return null;

            const temp = hourly.temperature_2m[index];
            let variation: HourlyWeather['temperature']['variation'] = 'equal';
            if (lastTemp !== undefined) {
                if (lastTemp < temp) variation = 'rise';
                else if (lastTemp > temp) variation = 'down';
            }
            lastTemp = temp;

            return {
                time: time.split("T")[1],
                icon: `weatherIcon=${hourly.weather_code[index]}_isDay=${hourly.is_day[index]}_isAnimate=false`,
                temperature: {
                    variation,
                    value: `${temp} ${units.temperature_2m}`
                },
                precipitation: `${hourly.precipitation[index]} ${units.precipitation}`,
                isDay: hourly.is_day[index],
                weatherCode: hourly.weather_code[index],
            };
        })
        .filter((item: any): item is HourlyWeather => item !== null)
        .slice(0, 24);
}

const getTodayWeather = async (): Promise<TodayWeatherPair[]> => {
    const { latitude, longitude, timezone, tempUnit, speedUnit, precipitationUnit } = getWeatherSettings();

    const url = new URL(BASE_URL);
    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
    url.searchParams.append("timezone", timezone);
    url.searchParams.append("daily", "temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_mean,wind_speed_10m_max,wind_direction_10m_dominant");
    url.searchParams.append("temperature_unit", tempUnit);
    url.searchParams.append("wind_speed_unit", speedUnit);
    url.searchParams.append("precipitation_unit", precipitationUnit);
    url.searchParams.append("models", "meteofrance_seamless");
    url.searchParams.append("forecast_days", "1");

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();

    if (!json.daily) throw new Error("API didn't get today weather data");

    const d = json.daily;
    const u = json.daily_units;

    return [
        {
            left: { name: "temperature_2m_min", icon: "minTemp", value: `${d.temperature_2m_min[0]} ${u.temperature_2m_min}` },
            right: { name: "temperature_2m_max", icon: "maxTemp", value: `${d.temperature_2m_max[0]} ${u.temperature_2m_max}` }
        },
        {
            left: { name: "sunrise", icon: "sunrise", value: d.sunrise[0].split("T")[1] },
            right: { name: "sunset", icon: "sunset", value: d.sunset[0].split("T")[1] }
        },
        {
            left: { name: "uv_index_max", icon: "uvIndex", value: d.uv_index_max[0] ?? 0 },
            right: { name: "precipitation_probability_mean", icon: "precipitationProbability", value: `${d.precipitation_probability_mean[0]} ${u.precipitation_probability_mean}` }
        },
        {
            left: { name: "wind_speed_10m_max", icon: "windSpeed", value: `${d.wind_speed_10m_max[0]} ${u.wind_speed_10m_max}` },
            right: { name: "wind_direction_10m_dominant", icon: "windDirection", value: `${d.wind_direction_10m_dominant[0]} ${u.wind_direction_10m_dominant}` }
        }
    ];
}

const getWeeklyWeather = async (): Promise<WeeklyWeather[]> => {
    const { latitude, longitude, timezone, tempUnit, speedUnit, precipitationUnit } = getWeatherSettings();

    const todayDate = new Date();
    const startDate = new Date(todayDate);
    const endDate = new Date(todayDate);
    startDate.setDate(todayDate.getDate() + 1);
    endDate.setDate(todayDate.getDate() + 7);

    const url = new URL(BASE_URL);
    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
    url.searchParams.append("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max");
    url.searchParams.append("timezone", timezone);
    url.searchParams.append("temperature_unit", tempUnit);
    url.searchParams.append("wind_speed_unit", speedUnit);
    url.searchParams.append("precipitation_unit", precipitationUnit);
    url.searchParams.append("models", "best_match");
    url.searchParams.append("start_date", startDate.toISOString().split("T")[0] || "");
    url.searchParams.append("end_date", endDate.toISOString().split("T")[0] || "");

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();

    if (!json.daily) throw new Error("API didn't get weekly weather data");

    const w = json.daily;
    const u = json.daily_units;

    return w.time.map((time: string, index: number): WeeklyWeather => ({
        day: getWeekdayName(time),
        icon: `weatherIcon=${w.weather_code[index]}_isDay=true_isAnimate=false`,
        temperature: {
            max: `${w.temperature_2m_max[index]} ${u.temperature_2m_max}`,
            min: `${w.temperature_2m_min[index]} ${u.temperature_2m_min}`
        },
        precipitation: {
            probability: `${w.precipitation_probability_max[index]} ${u.precipitation_probability_max}`,
            maximumValue: `${w.precipitation_sum[index]} ${u.precipitation_sum}`
        }
    }));
}
