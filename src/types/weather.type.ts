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

export interface TodayWeatherPair {
    left: WeatherMetric;
    right: WeatherMetric;
}

export interface WeatherMetric {
    name: string;
    icon: string;
    value: string | number;
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