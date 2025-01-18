import React, { useState } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Setter - Getter
import {
    getTimezone,
    getPrecipitationUnit,
    getSpeedUnit,
    getTemperatureUnit
} from "../LocalStorage/useGetter";
import {
    setTimezone,
    setPrecipitationUnit,
    setSpeedUnit,
    setTemperatureUnit
} from "../LocalStorage/useSetter";

// Data
import parametersList from "./parametersData.json";

// Components
import Modal from '../Modal';
import BooleanSlider from '../BooleanSlider';
import Icon from '../Icon';

// CSS
import styles from './footer.module.css'

const Footer = () => {
    const { t, i18n } = useTranslation();

    const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false); 

    const reloadPage = () => {
        window.location.reload();
    }
    
    const modalState = () => {
        if (settingsModalIsOpen) {
            // Close modal
            setSettingsModalIsOpen(false);
        } else {
            // Open modal
            setSettingsModalIsOpen(true);
        }
    }

    // Different unit setter
    const triggerSetTemperatureUnit = (value) => { setTemperatureUnit(value); }
    const triggerSetSpeedUnit = (value) => { setSpeedUnit(value); }
    const triggerSetPrecipitationUnit = (value) => { setPrecipitationUnit(value); }

    // Parameters modal content
    const modalContent = (
        <ul className={styles.parametersList}>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-timezone")}</p>
                <p>{getTimezone()}</p>
                <Icon
                    size={40}
                    name="change"
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-temperatureUnit")}</p>
                <BooleanSlider
                    values={parametersList.temperatureUnit}
                    defaultValue={getTemperatureUnit()}
                    returnValue={triggerSetTemperatureUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-speedUnit")}</p>
                <BooleanSlider
                    values={parametersList.speedUnit}
                    defaultValue={getSpeedUnit()}
                    returnValue={triggerSetSpeedUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-precipitationUnit")}</p>
                <BooleanSlider
                    values={parametersList.precipitationUnit}
                    defaultValue={getPrecipitationUnit()}
                    returnValue={triggerSetPrecipitationUnit}
                />
            </li>
        </ul>
    )

    // TODO create a select input and call the API to get all timezone available to set it

    return (
        <footer className={styles.root}>
            <div className={styles.cta} title={t("components-footer-iconAlt-reload")} onClick={reloadPage}>
                <Icon
                    size={40}
                    name="reload"
                />
            </div>
            <div className={styles.cta} title={t("components-footer-iconAlt-settings")} onClick={modalState}>
                <Icon
                    size={40}
                    name="setting"
                />
            </div>
            <Modal
                active={settingsModalIsOpen}
                title={t("components-footer-settingsModal-title")}
                message={modalContent}
                buttonText={t("components-footer-settingsModal-buttonText")}
                action={reloadPage}
                closeCallback={modalState}
            />
        </footer>
    );
}

export default Footer;
