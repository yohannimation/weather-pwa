import React, { useState } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// User Context
import { useUser } from '../../contexts/UserContext';

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
    const { user, updateUser } = useUser();

    const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

    const reloadPage = () => {
        window.location.reload();
    }

    const toggleModal = () => {
        setSettingsModalIsOpen((prev: boolean) => !prev);
    }

    const triggerSetTemperatureUnit = (value: string) => { updateUser({ temperatureUnit: value as any }); }
    const triggerSetSpeedUnit = (value: string) => { updateUser({ speedUnit: value as any }); }
    const triggerSetPrecipitationUnit = (value: string) => { updateUser({ precipitationUnit: value as any }); }

    const modalContent = (
        <ul className={styles.parametersList}>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-temperatureUnit")}</p>
                <BooleanSlider
                    values={parametersList.temperatureUnit}
                    defaultValue={user.temperatureUnit ?? 'default'}
                    returnValue={triggerSetTemperatureUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-speedUnit")}</p>
                <BooleanSlider
                    values={parametersList.speedUnit}
                    defaultValue={user.speedUnit ?? 'default'}
                    returnValue={triggerSetSpeedUnit}
                />
            </li>
            <li className={styles.parameterItem}>
                <p>{t("components-footer-settingsModal-precipitationUnit")}</p>
                <BooleanSlider
                    values={parametersList.precipitationUnit}
                    defaultValue={user.precipitationUnit ?? 'default'}
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
