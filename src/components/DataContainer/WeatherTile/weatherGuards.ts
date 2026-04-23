import { WeeklyWeather, HourlyWeather } from '../../../types';

export const isWeeklyWeather = (item: unknown): item is WeeklyWeather =>
    typeof item === 'object' && item !== null && 'day' in item;

export const isHourlyWeather = (item: unknown): item is HourlyWeather =>
    typeof item === 'object' && item !== null && 'time' in item;