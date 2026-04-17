import React from 'react';

// Component
import Icon from '../Icon';

// CSS
import verticalStyles from './ItemData/VerticalItemData/verticalItemData.module.css';
import horizontalStyles from './ItemData/HorizontalItemData/horizontalItemData.module.css';

// Types
import { HourlyWeather, WeeklyWeather } from '../../types';

interface WeatherTileProps {
    layout: 'vertical' | 'horizontal';
    data: any[]; // Using any temporarily as it can be either HourlyWeather[] or WeeklyWeather[]
}

const WeatherTile: React.FC<WeatherTileProps> = ({ layout, data }) => {
    if (!data || data.length === 0) return null;

    // Validation for Weekly (Vertical)
    const isWeekly = 'day' in data[0];
    // Validation for Hourly (Horizontal)
    const isHourly = 'time' in data[0];

    if (layout === 'vertical' && !isWeekly) {
        return <li className={verticalStyles.error}>Vertical items error</li>;
    }
    if (layout === 'horizontal' && !isHourly) {
        return <li className={horizontalStyles.error}>Horizontal items error</li>;
    }

    if (layout === 'vertical') {
        const weeklyData = data as WeeklyWeather[];
        return (
            <>
                {weeklyData.map((item, index) => (
                    <li key={index} className={verticalStyles.item}>
                        <p className={verticalStyles.day}>{item.day}</p>
                        <div className={verticalStyles.weatherIconContainer}>
                            <Icon size={40} name={item.icon} />
                        </div>
                        <div className={verticalStyles.precipitation}>
                            <Icon size={24} name="precipitation" />
                            {item.precipitation.maximumValue}
                        </div>
                        <div className={verticalStyles.temperatureContainer}>
                            <div className={verticalStyles.temperature}>
                                <Icon size={24} name="minTemp" />
                                {item.temperature.min}
                            </div>
                            <div className={verticalStyles.temperature}>
                                <Icon size={24} name="maxTemp" />
                                {item.temperature.max}
                            </div>
                        </div>
                    </li>
                ))}
            </>
        );
    } else {
        const hourlyData = data as HourlyWeather[];
        return (
            <>
                {hourlyData.map((item, index) => (
                    <li key={index} className={horizontalStyles.item}>
                        <p className={horizontalStyles.hour}>{item.time}</p>
                        <Icon size={50} name={item.icon} />
                        <div className={horizontalStyles.temperature}>
                            {item.temperature.variation ? (
                                <Icon size={24} name={item.temperature.variation} />
                            ) : null}
                            {item.temperature.value}
                        </div>
                        <div className={horizontalStyles.precipitation}>
                            <Icon size={24} name="precipitation" />
                            {item.precipitation}
                        </div>
                    </li>
                ))}
            </>
        );
    }
}

export default WeatherTile;
