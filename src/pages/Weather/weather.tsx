import React, { useRef } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Hooks
import { useWeather } from './useWeather';

// Components
import DataContainer from 'components/DataContainer';
import Footer from 'components/Footer';
import SingleDataContainer from 'components/SingleDataContainer';
import Header from 'components/Header';

import styles from './weather.module.css';

function Weather() {
    const { t } = useTranslation();
    const weatherRef = useRef<HTMLDivElement>(null);

    const {
        current,
        hourly,
        today,
        weekly,
        loading: isLoading,
        refetch,
        getBackgroundColor
    } = useWeather();

    const bgColor = current ? getBackgroundColor(current.weatherCode, current.isDay) : { backgroundColor: "var(--default-light-color)" };
    const mainClass = isLoading ? styles.mainDataLoading : styles.mainDataLoaded;

    const duringTheDayInfo = <div dangerouslySetInnerHTML={{ __html: t("pages-weather-today-content") }} ></div>;
    const nextDaysInfo = <div dangerouslySetInnerHTML={{ __html: t("pages-weather-nextDays-content") }} ></div>;

    if (!current || !hourly || !weekly) return

    return (
        <div id="weather-root-id" ref={weatherRef} className={styles.root} style={bgColor}>
            <Header
                currentWeather={current}
            />
            <div className={styles.content}>
                <main className={mainClass}>
                    <DataContainer
                        title={t("pages-weather-today")}
                        infoData={duringTheDayInfo}
                        isHorizontal={true}
                        weatherData={hourly || []}
                    />
                    <SingleDataContainer
                        data={today || []}
                    />
                    <DataContainer
                        title={t("pages-weather-nextDays")}
                        infoData={nextDaysInfo}
                        isHorizontal={false}
                        weatherData={weekly || []}
                    />
                </main>
            </div>
            <Footer refetch={refetch} />
        </div>
    );
}

export default Weather;
