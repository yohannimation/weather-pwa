export interface City {
    id_city: number;
    country_code: string;
    name_city: string;
    name_country: string;
    timezone: string;
    latitude: number;
    longitude: number;
}

export interface CurrentWeather {
    time: string;
    temperature: string;
    apparentTemperature: string;
    precipitation: string;
    icon: string;
    weatherCode: number;
    codeName: 'clear' | 'cloudy' | 'fogy' | 'rainy' | 'snowy' | 'thunderstorm';
    isDay: boolean;
}

export interface HourlyWeather {
    time: string;
    icon: string;
    temperature: {
        variation: 'rise' | 'down' | 'equal';
        value: string;
    };
    precipitation: string;
    isDay: boolean;
    weatherCode: number;
}

export interface WeatherMetric {
    name: string;
    icon: string;
    value: string | number;
}

export interface TodayWeatherPair {
    left: WeatherMetric;
    right: WeatherMetric;
}

export interface WeeklyWeather {
    day: string;
    icon: string;
    temperature: {
        max: string;
        min: string;
    };
    precipitation: {
        probability: string;
        maximumValue: string;
    };
}

export type UnitSetting = 'default' | 'secondary';

export interface UserPreferences {
    precipitationUnit: UnitSetting;
    speedUnit: UnitSetting;
    temperatureUnit: UnitSetting;
    language: string;
    cookiesAccepted: boolean;
}

export interface UserLocationState {
    cityName: string;
    latitude: string;
    longitude: string;
    timezone: string;
}

export interface AppErrorState {
    hasError: boolean;
    title: string;
    message: string;
}
