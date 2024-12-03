import React, { useState, useEffect }  from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Component use
import { locateMeTreatment } from './useLocationForm';

// Components
import BooleanSlider from '../BooleanSlider';
import Button from '../Button';
import InputSearchBar from '../SearchBar/InputSearchBar';
import Loading from '../Loading';

// CSS
import styles from './locationForm.module.css';

const LocationForm = () => {
    const { t, i18n } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [sliderContainer, setSliderContainer] = useState(styles.leftSliderContainer);

    const booleanSlider = {
        "default": t("components-locationForm-booleanSlider-default"),
        "secondary": t("components-locationForm-booleanSlider-secondary")
    };

    const booleanSliderTrigger = (value) => {
        if (value === "default") {
            setSliderContainer(styles.leftSliderContainer);
        } else {
            setSliderContainer(styles.rightSliderContainer);
        }
    }

    const locateMeTrigger = async () => {
        setIsLoading(true);

        if (await locateMeTreatment()) {
            window.location.href = '/';
        } else {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.root}>
            <Loading isLoading={isLoading} />
            <div className={styles.booleanSliderContainer}>
                <BooleanSlider
                    values={booleanSlider}
                    returnValue={booleanSliderTrigger}
                />
            </div>
            <div className={sliderContainer}>
                <div className={styles.manuallyContainer}>
                    <InputSearchBar />
                </div>
                <div className={styles.automaticallyContainer}>
                    <Button triggerAction={locateMeTrigger}>
                        {t("components-locationForm-locateMePart-buttonText")}
                    </Button>
                    <p>{t("components-locationForm-locateMePart-preventMessage")}</p>
                </div>
            </div>
        </div>
    );
}

export default LocationForm;
