import React, { useState } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Components
import Popup from '../Popup';
import Icon from '../Icon';

// CSS
import styles from './infoPopup.module.css';

interface InfoPopupProps {
    title: string;
    content: React.ReactNode | string;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ title, content }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const infoPopupTrigger = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className={styles.root}>
            <div className={styles.iconContainer} onClick={infoPopupTrigger}>
                <Icon size={30} name="info" />
            </div>
            <Popup
                active={isOpen}
                title={title}
                message={content}
                buttonText={t("components-infoPopup-buttonText")}
                action={infoPopupTrigger}
            />
        </div>
    );
}

export default InfoPopup;
