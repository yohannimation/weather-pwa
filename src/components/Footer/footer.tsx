import React, { useState } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// User Context
import { useUser } from '../../contexts/UserContext';

// Data
import parametersList from "./parametersData.json";

// Component use
import { reload } from '../../utils/redirectUtils';

// Components
import Modal from '../Modal';
import BooleanSlider from '../BooleanSlider';
import Icon from '../Icon';
import InstallBanner from '../InstallBanner';

// CSS
import styles from './footer.module.css';

// Type
import { UnitSetting } from '../../types';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const { user, updateUser } = useUser();

    const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

    const toggleModal = () => {
        setSettingsModalIsOpen((prev: boolean) => !prev);
    }

    const triggerSetTemperatureUnit = (value: string) => { updateUser({ temperatureUnit: value as UnitSetting }); }
    const triggerSetSpeedUnit = (value: string) => { updateUser({ speedUnit: value as UnitSetting }); }
    const triggerSetPrecipitationUnit = (value: string) => { updateUser({ precipitationUnit: value as UnitSetting }); }

    const modalContent = (
        <>
            <InstallBanner />
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
            </ul>
        </>
    )

    return (
        <footer className={styles.root}>
            <div className={styles.cta} title={t("components-footer-iconAlt-reload")} onClick={reload}>
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
                action={reload}
                closeCallback={toggleModal}
            />
        </footer>
    );
}

export default Footer;
