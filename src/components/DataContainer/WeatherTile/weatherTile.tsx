import React from 'react';

// Component logic
import { isWeeklyWeather, isHourlyWeather } from "./weatherGuards";

// Component
import VerticalWeatherItem from './Items/verticalItem';
import HorizontalWeatherItem from './Items/horizontalItem';

// CSS
import verticalStyles from './Items/verticalItemData.module.css';
import horizontalStyles from './Items/horizontalItemData.module.css';

// Types
import { HourlyWeather, WeeklyWeather } from '../../../types';

interface WeatherTileProps {
    layout: 'vertical' | 'horizontal';
    data: HourlyWeather[] | WeeklyWeather[];
}

const WeatherTile: React.FC<WeatherTileProps> = ({ layout, data }) => {
    if (!data || data.length === 0) return null;

    if (layout === 'vertical') {
        if (!isWeeklyWeather(data[0]))
            return <li className={verticalStyles.error}>Vertical items error</li>;

        return (
            <>
                {(data as WeeklyWeather[]).map((item) => (
                <VerticalWeatherItem key={item.day} item={item} />
                ))}
            </>
        );
    }

    if (!isHourlyWeather(data[0]))
        return <li className={horizontalStyles.error}>Horizontal items error</li>;

    return (
        <>
            {(data as HourlyWeather[]).map((item) => (
                <HorizontalWeatherItem key={item.time} item={item} />
            ))}
        </>
    );
}

export default WeatherTile;
