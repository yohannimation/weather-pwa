import React, { useState } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Setter - Getter
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

    const [parametersModalIsOpen, setParametersModalIsOpen] = useState(false); 

    const reloadPage = () => {
        window.location.reload();
    }

    // Open parameters modal
    const parametersModalTrigger = () => {
        if (parametersModalIsOpen) {
            // Reload page to save data
            reloadPage();
        } else {
            // Open modal
            setParametersModalIsOpen(true);
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
                <select>
                    <option>Test1</option>
                    <option>Test2</option>
                </select>
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-temperatureUnit")}</p>
                <BooleanSlider
                    values={parametersList.temperatureUnit}
                    returnValue={triggerSetTemperatureUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-speedUnit")}</p>
                <BooleanSlider
                    values={parametersList.speedUnit}
                    returnValue={triggerSetSpeedUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-precipitationUnit")}</p>
                <BooleanSlider
                    values={parametersList.precipitationUnit}
                    returnValue={triggerSetPrecipitationUnit}
                />
            </li>
        </ul>
    )

    // TODO change the footer icons
    // TODO create a select input and call the API to get all timezone available to set it

    return (
        <footer className={styles.root}>
            <div className={styles.cta} title={t("components-footer-iconAlt-reload")} onClick={reloadPage}>
                <Icon
                    size={40}
                    name="reload"
                />
            </div>
            <div className={styles.cta} title={t("components-footer-iconAlt-settings")} onClick={parametersModalTrigger}>
                <Icon
                    size={40}
                    name="setting"
                />
            </div>
            <Modal
                active={parametersModalIsOpen}
                title={t("components-footer-settingsModal-title")}
                message={modalContent}
                buttonText={t("components-footer-settingsModal-buttonText")}
                action={parametersModalTrigger}
            />
        </footer>
    );
}

export default Footer;
