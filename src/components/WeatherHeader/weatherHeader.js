import React, { useState } from 'react';
import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

// Translation
import { useTranslation } from 'react-i18next';

import InputSearchBar from '../SearchBar/InputSearchBar';
import Icon from '../Icon';

import styles from './weatherHeader.module.css';

const WeatherHeader = props => {
    const { t, i18n } = useTranslation();

    const {
        apparentTemperature,
        icon,
        isDay,
        precipitation,
        temperature,
        time,
        weatherCode,
    } = props.currentWeather;

    return (
        <header className={styles.header}>
            <span className={styles.backgroundHeader}></span>
            <div className={styles.searchBarContainer}>
                <InputSearchBar />
            </div>
            <div className={styles.dataContainer}>
                <div className={styles.mainData}>
                    <span>{temperature}</span>
                </div>
                <div className={styles.secondaryData}>
                    <div className={styles.secondaryDataItem}>
                        <Icon
                            size={24}
                            name={icon}
                            code={14}
                        />
                        {t("components-weatherHeader-feeling")} {apparentTemperature}
                    </div>
                    <div className={styles.secondaryDataItem}>
                        <Icon
                            size={24}
                            name="/icon/day/clear"
                            code={14}
                        />
                        {t("components-weatherHeader-precipitation")} {precipitation}
                    </div>
                </div>
            </div>
            <div className={styles.gifContainer}>
                <Icon
                    size={60}
                    name="/icon/day/clear"
                    code={14}
                />
                XXXXXXXX
            </div>
            <div className={styles.lastUpdateContainer}><span>{time}</span></div>
        </header>
    );
}

export default WeatherHeader;
