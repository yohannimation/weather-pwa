import React, { useState, useEffect } from 'react';

import { checkRequiredCookies, getCurrentWeather } from './useWeather';

import Loading from '../../components/Loading'
// import WeatherFooter from '../../components/WeatherFooter';
import WeatherHeader from '../../components/WeatherHeader';

import styles from './weather.module.css';

function Weather() {
    checkRequiredCookies();

    const [isLoading, setIsLoading] = useState(styles.loaderOn);
    const [mainClass, setMainClass] = useState(styles.mainWithoutData);
    const [mainBackgroundColor, setMainBackgroundColor] = useState({backgroundColor: "var(--default-light-color)"});
    const [currentWeather, setCurrentWeather] = useState();

    // Fetch current data
    useEffect( () => {
        async function fetchCurrentWeather() {
            if (!currentWeather) {
                try {
                    setCurrentWeather(await getCurrentWeather());
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchCurrentWeather();

        // Check if the current weather data are set
        if (
            currentWeather !== undefined &&
            Object.keys(currentWeather).length
        ) {
            // Set the background color of the app
            if (currentWeather.weatherCode.value > 3) {
                // Weather code for raining
                setMainBackgroundColor({backgroundColor: "var(--rain-first-color)"});
            } else {
                if (currentWeather.isDay.value) {
                    // Weather code for day and clear sky
                    setMainBackgroundColor({backgroundColor: "var(--day-first-color)"});
                } else {
                    // Weather code for night and clear sky
                    setMainBackgroundColor({backgroundColor: "var(--night-first-color)"});
                }
            }
        }
    }, [currentWeather])

    setTimeout(() => {
        setIsLoading(styles.loaderOff)
        setMainClass(styles.mainDataSet)
    }, 1000)

    return (
        <div className={styles.root} style={mainBackgroundColor}>
            <div className={isLoading}>
                <Loading />
            </div>
            <div className={styles.weatherContent}>
                <WeatherHeader currentWeather={currentWeather} />
                <main className={mainClass}>
                    <div className={styles.test}>
                        <div className={styles.testHeader}>
                            <p>~27°C</p>
                            <p>header</p>
                        </div>
                        <p>content</p>
                    </div>
                </main>
                {/* <WeatherFooter /> */}
            </div>
        </div>
    );
}

export default Weather;
