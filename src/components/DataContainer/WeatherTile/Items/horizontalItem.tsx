import React from 'react';

// Component
import Icon from '../../../Icon';

// CSS
import horizontalStyles from './horizontalItemData.module.css';

// Types
import { HourlyWeather } from '../../../../types';

const HorizontalWeatherItem: React.FC<{ item: HourlyWeather }> = ({ item }) => (
    <li className={horizontalStyles.item}>
        <p className={horizontalStyles.hour}>{item.time}</p>
        <Icon size={50} name={item.icon} />
        <div className={horizontalStyles.temperature}>
            {item.temperature.variation && (
            <Icon size={24} name={item.temperature.variation} />
            )}
            {item.temperature.value}
        </div>
        <div className={horizontalStyles.precipitation}>
            <Icon size={24} name="precipitation" />{item.precipitation}
        </div>
    </li>
);

export default HorizontalWeatherItem;