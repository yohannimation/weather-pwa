import React, { useState } from 'react';
import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

import { useTranslation } from 'react-i18next';

import SearchBar from '../SearchBar';

import styles from './weatherHeader.module.css';

const WeatherHeader = props => {
    const { currentWeatherData, userUnit, lastUpdate } = props;
    const { t, i18n } = useTranslation();

    const handleSearchBarTreatment = () => {

    }

    return (
        <header className={styles.headerTop}>
            <span className={styles.backgroundHeader}></span>
            <div className={styles.searchBarContainer}>
                <SearchBar placeholder={t('locate.searchBarPlaceholder')} returnValue={handleSearchBarTreatment} />
            </div>
            <div className={styles.currentWeatherContainer}>
                <div className={styles.temperature}>
                    <span>24.4</span>&nbsp;<span>C°</span></div>
                <div className={styles.secondaryData}>
                    <div className={styles.feeling}>
                        Ressenti <span>27</span>&nbsp;<span>°C</span>
                    </div>
                    <div className={styles.precipitation}>
                        <img src='/favicon.ico' className={styles.precipitationIcon} /><span>0</span><span>mm</span>
                    </div>
                </div>
            </div>
            <div className={styles.gifContainer}>
                <img src='/favicon.ico' className={styles.img} />
            </div>
            <div className={styles.lastUpdateContainer}><span>26/08/2024 - 20:27</span></div>
        </header>
    );
}

export default WeatherHeader;
