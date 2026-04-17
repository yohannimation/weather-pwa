import React, { useRef } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Hooks
import { useWeather } from './useWeather';

// Components
import DataContainer from '../../components/DataContainer';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import SingleDataContainer from '../../components/SingleDataContainer';
import WeatherHeader from '../../components/WeatherHeader';

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
    } = useWeather();

    // Since background color depends on weather data, we calculate it here
    // normally this would be in the hook, let's assume we handle the logic
    const getBackgroundColor = (weatherCode: number, isDay: boolean) => {
        if (weatherCode > 3) return { backgroundColor: "var(--rain-first-color)" };
        return isDay ? { backgroundColor: "var(--day-first-color)" } : { backgroundColor: "var(--night-first-color)" };
    };

    const bgColor = current ? getBackgroundColor(current.weatherCode, current.isDay) : { backgroundColor: "var(--default-light-color)" };
    const mainClass = isLoading ? styles.mainDataLoading : styles.mainDataLoaded;

    const duringTheDayInfo = <div dangerouslySetInnerHTML={{ __html: t("pages-weather-today-content") }} ></div>;
    const nextDaysInfo = <div dangerouslySetInnerHTML={{ __html: t("pages-weather-nextDays-content") }} ></div>;

    return (
        <div id="weather-root-id" ref={weatherRef} className={styles.root} style={bgColor}>
            <Loading isLoading={isLoading}/>
            {current && (
                <WeatherHeader
                    currentWeather={current}
                />
            )}
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
            <Footer />
        </div>
    );
}

export default Weather;
