import React, { useState, useEffect }  from 'react';
import { Helmet } from "react-helmet";

import { locationTreatment } from './useLocate';
import { useTranslation } from 'react-i18next';
import { getDeviceLanguage } from "../../components/LocalStorage/useGetter";

import BooleanSlider from "../../components/BooleanSlider";
import Button from "../../components/Button";
import Loading from '../../components/Loading';
import SearchBar from "../../components/SearchBar";
import Title from '../../components/Title';

import styles from './locate.module.css'

const Locate = () => {
    const { t, i18n } = useTranslation();

    const booleanSliderValues = {
        "default": t('locate.booleanSliderValues.default'),
        "secondary": t('locate.booleanSliderValues.secondary')
    };
    const [booleanSliderValueSelected, setBooleanSliderValueSelected] = useState("Manually");
    const [formClass, setFormClass] = useState(styles.defaultFormContainer);
    const [isLoading, setIsLoading] = useState(styles.loaderOff);
    const [locateMeButtonErrorMessage, setLocateMeButtonErrorMessage] = useState("");

    const booleanSliderTreatment = (value) => {
        setBooleanSliderValueSelected(value);
    }

    const handleLocateButton = async () => {
        // Turn on the loader
        setIsLoading(styles.loaderOn);

        // Check if the geolocation is available in the navigator
        if ("geolocation" in navigator) {
            // Ask the user to accept to use his GPS and get the coordinates
            navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Set the API url to get the city name
                    const fetchUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + latitude + "&longitude=" + longitude + "&localityLanguage=" + getDeviceLanguage();

                    // Fetching data
                    try {
                        const response = await fetch(fetchUrl);
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        const jsonResponse = await response.json();

                        locationTreatment({
                            "cityName": jsonResponse.locality,
                            "cityLatitude": latitude,
                            "cityLongitude": longitude
                        })
                    } catch (error) {
                        // TODO error from fetch API WIP
                        setIsLoading(styles.loaderOff);
                        console.log(error);
                    }
                },
                (error) => {
                    // TODO error from navigator.geolocation WIP
                    setIsLoading(styles.loaderOff);
                    switch (error.code) {
                        case 1:
                            setLocateMeButtonErrorMessage("permissionDenied");
                            break;
                        case 2:
                            setLocateMeButtonErrorMessage("positionUnavailable");
                            break;
                        case 3:
                            setLocateMeButtonErrorMessage("timeout");
                            break;
                        default:
                            setLocateMeButtonErrorMessage("");
                    }
                }
            );
        } else {
            // Geolocation not supported by the browser
            setIsLoading(styles.loaderOff);
            setLocateMeButtonErrorMessage("Geolocation is not supported by this browser.");
        }
    }

    const handleSearchBarTreatment = (value) => {
        locationTreatment(value);
    }

    useEffect(() => {
        if (booleanSliderValueSelected === "default") {
            setFormClass(styles.defaultFormContainer);
        } else {
            setFormClass(styles.secondaryFormContainer);
        }
    }, [booleanSliderValueSelected]);

    return (
        <div className={styles.root}>
            <Helmet>
                <title>Weather APP - {t('locate.headerTitle')}</title>
            </Helmet>

            <div className={isLoading}>
                <Loading />
            </div>
            <div className={styles.appImgContainer}>
                <img className={styles.appImg} />
            </div>
            <div className={styles.formContainer}>
                <Title size={1}>{t('locate.pageTitle')}</Title>
                <div className={styles.booleanSliderContainer}>
                    <BooleanSlider values={booleanSliderValues} returnValue={booleanSliderTreatment} />
                </div>
                <div className={styles.form}>
                    <div className={formClass}>
                        <div className={styles.defaultForm}>
                            <SearchBar placeholder={t('locate.searchBarPlaceholder')} returnValue={handleSearchBarTreatment} />
                        </div>
                        <div className={styles.secondaryForm}>
                            <Button onClickReturn={handleLocateButton}>{t('locate.locateMeButton')}</Button>
                            <p className={styles.preventMessage}>{t('locate.locateMePreventMessage')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Locate;
