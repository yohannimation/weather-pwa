import React, { useState } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// User Context
import { useUser } from 'contexts/UserContext';

// Data
import parametersList from "./parametersData.json";

// Components
import BooleanSlider from 'components/BooleanSlider';
import Icon from 'components/Icon';
import InstallBanner from 'components/InstallBanner';
import Modal from 'components/Modal';
import Select from 'components/Select/select';

// CSS
import styles from './footer.module.css';

// Type
import { UnitSetting } from 'types';
import { SelectOption } from 'components/Select/select';

interface FooterProps {
    refetch: () => void;
}

const Footer: React.FC<FooterProps> = ({ refetch }: FooterProps) => {
    const { t } = useTranslation();
    const { user, updateUser } = useUser();

    const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

    const timezoneOptions: SelectOption[] = Intl.supportedValuesOf('timeZone').map(timezone => ({
        label: timezone,
        value: timezone,
    }));

    const toggleModal = () => {
        setSettingsModalIsOpen((prev: boolean) => !prev);
    }

    const triggerSetTimezone = (value: string) => { updateUser({ timezone: value }); }
    const triggerSetTemperatureUnit = (value: string) => { updateUser({ temperatureUnit: value as UnitSetting }); }
    const triggerSetSpeedUnit = (value: string) => { updateUser({ speedUnit: value as UnitSetting }); }
    const triggerSetPrecipitationUnit = (value: string) => { updateUser({ precipitationUnit: value as UnitSetting }); }
    const triggerSetLanguage = (value: string) => {
        updateUser({ i18nextLng: value === "default" ? 'fr' : 'en' });
        import('i18next').then(i18n => i18n.changeLanguage(value === "default" ? 'fr' : 'en'));
    }

    const modalContent = (
        <>
            <InstallBanner />
            <ul className={styles.parametersList}>
                <li className={styles.parameterItem}>
                    <p>{t("components-footer-settingsModal-timezone")}</p>
                    <Select
                        options={timezoneOptions}
                        value={user.timezone ? { label: user.timezone, value: user.timezone } : null}
                        onChange={(option) => triggerSetTimezone(option.value)}
                    />
                </li>
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
                <li className={styles.parameterItem}>
                    <p>{t("components-footer-settingsModal-language")}</p>
                    <BooleanSlider
                        values={parametersList.language}
                        defaultValue={user.i18nextLng === "fr" ? 'default' : 'second'}
                        returnValue={triggerSetLanguage}
                    />
                </li>
            </ul>
        </>
    )

    return (
        <footer className={styles.root}>
            <div className={styles.cta} title={t("components-footer-iconAlt-reload")} onClick={refetch}>
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
                action={() => {
                    refetch()
                    toggleModal()
                }}
                closeCallback={toggleModal}
            />
        </footer>
    );
}

export default Footer;
