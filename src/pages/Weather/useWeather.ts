import { useState, useEffect } from 'react';
import { getWeatherData } from '../../services/api/weatherService';
import type { CurrentWeather, HourlyWeather, TodayWeatherPair, WeeklyWeather } from '../../types';
import { useUser } from '../../contexts/UserContext';

interface WeatherState {
    current: CurrentWeather | null;
    hourly: HourlyWeather[] | null;
    today: TodayWeatherPair[] | null;
    weekly: WeeklyWeather[] | null;
    loading: boolean;
    error: string | null;
}

export const useWeather = () => {
    const { isLoading, setLoading } = useUser();
    const [state, setState] = useState<WeatherState>({
        current: null,
        hourly: null,
        today: null,
        weekly: null,
        loading: isLoading,
        error: null,
    });

    const fetchWeather = async () => {
        setLoading(true)
        setState(prev => ({ ...prev, loading: isLoading, error: null }));
        try {
            const [current, hourly, today, weekly] = await getWeatherData();
            setLoading(false)

            setState({
                current,
                hourly,
                today,
                weekly,
                loading: isLoading,
                error: null,
            });
        } catch (err) {
            setLoading(false)
            setState(prev => ({
                ...prev,
                loading: isLoading,
                error: err instanceof Error ? err.message : 'An unexpected error occurred',
            }));
        }
    };

    const getBackgroundColor = (weatherCode: number, isDay: boolean) => {
        if (weatherCode > 3) return { backgroundColor: "var(--rain-first-color)" };
        return isDay ? { backgroundColor: "var(--day-first-color)" } : { backgroundColor: "var(--night-first-color)" };
    }

    useEffect(() => {
        fetchWeather();
    }, []);

    return { ...state, refetch: fetchWeather, getBackgroundColor };
}
