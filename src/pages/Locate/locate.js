import React, { useState, useEffect }  from 'react';
import { Helmet } from "react-helmet";

import { setCoordinate, setCityName } from "../../components/LocalStorage/useSetter";
import { getLocation } from './useLocate';
import { useTranslation } from 'react-i18next';

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

    const booleanSliderTreatment = (value) => {
        setBooleanSliderValueSelected(value);
    }

    const handdleLocateButton = async () => {
        setIsLoading(styles.loaderOn);

        getLocation((positionData) => {
            console.log(positionData)
        });
        /*navigator.geolocation.getCurrentPosition(async (position) =>  {
            const fetchUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&localityLanguage=fr";

            try {
                const response = await fetch(fetchUrl);
        
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
        
                const jsonResponse = await response.json();

                console.log(jsonResponse.locality)

                if (
                    setCityName(jsonResponse.locality) &&
                    setCoordinate(
                        position.coords.latitude,
                        position.coords.longitude
                    )
                ) {
                    origin = document.location.origin;
                    document.location.href = origin + "/";
                }
            } catch (error) {
                throw new Error(error);
            }
        })*/
    }

    const searchBarTreatment = (value) => {
        if (
            typeof value === 'object' &&
            "cityName" in value &&
            "cityLatitude" in value &&
            "cityLongitude" in value &&
            setCityName(value.cityName) &&
            setCoordinate(
                    value.cityLatitude,
                    value.cityLongitude
            )
        ) {
            origin = document.location.origin;
            document.location.href = origin + "/";
        }
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
                            <SearchBar placeholder={t('locate.searchBarPlaceholder')} returnValue={searchBarTreatment} />
                        </div>
                        <div className={styles.secondaryForm}>
                            <Button onClickReturn={handdleLocateButton}>{t('locate.locateMeButton')}</Button>
                            <p className={styles.preventMessage}>{t('locate.locateMePreventMessage')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Locate;
