import { useState, useEffect } from 'react';
import { getWeatherData } from '../../services/api/weatherService';
import type { CurrentWeather, HourlyWeather, TodayWeatherPair, WeeklyWeather } from '../../types';

interface WeatherState {
    current: CurrentWeather | null;
    hourly: HourlyWeather[] | null;
    today: TodayWeatherPair[] | null;
    weekly: WeeklyWeather[] | null;
    loading: boolean;
    error: string | null;
}

export const useWeather = () => {
    const [state, setState] = useState<WeatherState>({
        current: null,
        hourly: null,
        today: null,
        weekly: null,
        loading: true,
        error: null,
    });

    const fetchWeather = async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const [current, hourly, today, weekly] = await getWeatherData();
            setState({
                current,
                hourly,
                today,
                weekly,
                loading: false,
                error: null,
            });
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: err instanceof Error ? err.message : 'An unexpected error occurred',
            }));
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return { ...state, refetch: fetchWeather };
}
