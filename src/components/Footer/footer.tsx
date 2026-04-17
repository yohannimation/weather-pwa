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
import InstallBanner from '../InstallBanner';

// CSS
import styles from './footer.module.css';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

    const reloadPage = () => {
        window.location.reload();
    }

    const toggleModal = () => {
        setSettingsModalIsOpen((prev: boolean) => !prev);
    }

    const triggerSetTemperatureUnit = (value: string) => { setTemperatureUnit(value as any); }
    const triggerSetSpeedUnit = (value: string) => { setSpeedUnit(value as any); }
    const triggerSetPrecipitationUnit = (value: string) => { setPrecipitationUnit(value as any); }

    const modalContent = (
        <ul className={styles.parametersList}>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-temperatureUnit")}</p>
                <BooleanSlider
                    values={parametersList.temperatureUnit}
                    defaultValue={getTemperatureUnit() ?? 'default'}
                    returnValue={triggerSetTemperatureUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-speedUnit")}</p>
                <BooleanSlider
                    values={parametersList.speedUnit}
                    defaultValue={getSpeedUnit() ?? 'default'}
                    returnValue={triggerSetSpeedUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-precipitationUnit")}</p>
                <BooleanSlider
                    values={parametersList.precipitationUnit}
                    defaultValue={getPrecipitationUnit() ?? 'default'}
                    returnValue={triggerSetPrecipitationUnit}
                />
            </li>
            <li className={styles.installBannerContainer}>
                <InstallBanner closable={false} />
            </li>
        </ul>
    )

    return (
        <footer className={styles.root}>
            <div className={styles.cta} title={t("components-footer-iconAlt-reload")} onClick={reloadPage}>
                <Icon size={40} name="reload" />
            </div>
            <div className={styles.cta} title={t("components-footer-iconAlt-settings")} onClick={toggleModal}>
                <Icon size={40} name="setting" />
            </div>
            <Modal
                active={settingsModalIsOpen}
                title={t("components-footer-settingsModal-title")}
                message={modalContent}
                buttonText={t("components-footer-settingsModal-buttonText")}
                action={reloadPage}
                closeCallback={toggleModal}
            />
        </footer>
    );
}

export default Footer;
