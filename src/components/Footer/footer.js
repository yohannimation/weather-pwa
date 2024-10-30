import React, { useState } from 'react';

import {
    setTimezone,
    setPrecipitationUnit,
    setSpeedUnit,
    setTemperatureUnit
} from "../LocalStorage/useSetter";

import parametersList from "./parametersData.json";

import Modal from '../Modal';
import BooleanSlider from '../BooleanSlider';

import styles from './footer.module.css'

const Footer = () => {
    const [parametersModalIsOpen, setParametersModalIsOpen] = useState(false); 

    const reloadPage = () => {
        window.location.reload();
    }

    const parametersModalTrigger = () => {
        if (parametersModalIsOpen) {
            window.location.reload();
        } else {
            setParametersModalIsOpen(true);
        }
    }

    const triggerSetTemperatureUnit = (value) => {
        setTemperatureUnit(parametersList.temperatureUnit[value]);
    }
    const triggerSetSpeedUnit = (value) => {
        setSpeedUnit(parametersList.speedUnit[value]);
    }
    const triggerSetPrecipitationUnit = (value) => {
        setPrecipitationUnit(parametersList.precipitationUnit[value]);
    }

    const modalContent = (
        <ul className={styles.parametersList}>
            <li className={styles.parameterItem}>
                <p>Timezone</p>
                <select>
                    <option>Test1</option>
                    <option>Test2</option>
                </select>
            </li>
            <li className={styles.parameterItem}>
                <p>Unité de température</p>
                <BooleanSlider
                    values={parametersList.temperatureUnit}
                    returnValue={triggerSetTemperatureUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>Unité de vitesse</p>
                <BooleanSlider
                    values={parametersList.speedUnit}
                    returnValue={triggerSetSpeedUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>Unité de precipitation</p>
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
            <div className={styles.cta} title='Reload' onClick={reloadPage}>
                <img src='/logo512.png' alt='reload button'/>
            </div>
            <div className={styles.cta} title='Parameters' onClick={parametersModalTrigger}>
                <img src='/logo512.png' alt='parameters button'/>
            </div>
            <Modal
                active={parametersModalIsOpen}
                title="Parameters"
                message={modalContent}
                buttonText="Done"
                action={parametersModalTrigger}
            />
        </footer>
    );
}

export default Footer;
