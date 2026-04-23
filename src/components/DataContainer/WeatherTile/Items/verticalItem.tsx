import React from 'react';

// Component
import Icon from '../../../Icon';

// CSS
import verticalStyles from './verticalItemData.module.css';

// Types
import { WeeklyWeather } from '../../../../types';

const VerticalWeatherItem: React.FC<{ item: WeeklyWeather }> = ({ item }) => (
    <li className={verticalStyles.item}>
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
            <Icon size={24} name="minTemp" />{item.temperature.min}
            </div>
            <div className={verticalStyles.temperature}>
            <Icon size={24} name="maxTemp" />{item.temperature.max}
            </div>
        </div>
    </li>
);

export default VerticalWeatherItem;