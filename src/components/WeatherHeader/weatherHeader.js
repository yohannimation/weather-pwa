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
        precipitation,
        temperature,
        time,
        codeName
    } = props.currentWeather;

    return (
        <header className={styles.header}>
            <span className={`${styles.backgroundHeader} ${styles.scrollTimelineRange160}`}></span>
            <div className={`${styles.searchBarContainer} ${styles.scrollTimelineRange160}`}>
                <InputSearchBar />
            </div>
            <div className={`${styles.dataContainer} ${styles.scrollTimelineRange160}`}>
                <div className={`${styles.mainData} ${styles.scrollTimelineRange160}`}>
                    <span>{temperature}</span>
                </div>
                <div className={`${styles.secondaryData} ${styles.scrollTimelineRange50}`}>
                    <div className={styles.secondaryDataItem}>
                        {t("components-weatherHeader-feeling")} {apparentTemperature}
                    </div>
                    <div className={styles.secondaryDataItem}>
                        {t("components-weatherHeader-precipitation")} {precipitation}
                    </div>
                </div>
            </div>
            <div className={`${styles.gifContainer} ${styles.scrollTimelineRange160}`}>
                <Icon
                    size={180}
                    name={icon}
                />
            </div>
            <div className={`${styles.lastUpdateContainer} ${styles.scrollTimelineRange160}`}><span>{time}</span></div>
        </header>
    );
}

export default WeatherHeader;
