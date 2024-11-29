import React, { useState, useEffect } from 'react';

import {
    checkRequiredCookies,
    defaultBackgroundColorTreatment,
    getWeatherData
} from './useWeather';

// Components
import DataContainer from '../../components/DataContainer';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import SingleDataContainer from '../../components/SingleDataContainer';
import WeatherHeader from '../../components/WeatherHeader';

import styles from './weather.module.css';

function Weather() {
    checkRequiredCookies();

    const [isLoading, setIsLoading] = useState(true);
    const [mainBackgroundColor, setMainBackgroundColor] = useState({backgroundColor: "var(--default-light-color)"});
    const [mainClass, setMainClass] = useState(styles.mainDataLoading);
    const [weatherData, setWeatherData] = useState();

    // Fetch current data
    useEffect(() => {
        const getWeather = async () => {
            setWeatherData(await getWeatherData());
        }

        if (!weatherData) {
            getWeather();
        } else {
            setMainBackgroundColor(
                defaultBackgroundColorTreatment(
                    weatherData[0].weatherCode,
                    weatherData[0].isDay
                )
            )
            setIsLoading(false);
            setMainClass(styles.mainDataLoaded);
        }
    }, [weatherData])

    return (
        <div id="weather-root-id" className={styles.root} style={mainBackgroundColor}>
            <Loading isLoading={isLoading}/>
            <div className={styles.content}>
                <div className={styles.headerContainer}>
                    <WeatherHeader currentWeather={weatherData ? weatherData[0] : [{}]} />
                </div>
                <main className={mainClass}>
                    <DataContainer
                        title="Dans la journée"
                        infoData={null}
                        isHorizontal={true}
                        weatherData={weatherData ? weatherData[1] : [{}]}
                    />
                    <SingleDataContainer
                        data={weatherData ? weatherData[2] : [{}]}
                    />
                    <DataContainer
                        title="Les prochain jours"
                        infoData={null}
                        isHorizontal={false}
                        weatherData={weatherData ? weatherData[3] : [{}]}
                    />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Weather;
