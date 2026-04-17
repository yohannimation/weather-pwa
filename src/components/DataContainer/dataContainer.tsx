import React from 'react';

// Components
import HeaderDataContainer from './HeaderDataContainer';
import WeatherTile from './WeatherTile';

// CSS
import styles from './dataContainer.module.css';

interface DataContainerProps {
    title: string;
    infoData: React.ReactNode;
    isHorizontal: boolean;
    weatherData: any[]; // Can be HourlyWeather[] or WeeklyWeather[]
}

const DataContainer: React.FC<DataContainerProps> = ({
    title,
    infoData,
    isHorizontal,
    weatherData
}) => {
    const containerClass = isHorizontal ? styles.horizontalClass : styles.verticalClass;

    return (
        <div className={styles.root}>
            <HeaderDataContainer
                title={title}
                infoData={infoData}
            />
            <ul className={containerClass}>
                <WeatherTile
                    layout={isHorizontal ? 'horizontal' : 'vertical'}
                    data={weatherData}
                />
            </ul>
        </div>
    );
}

export default DataContainer;
