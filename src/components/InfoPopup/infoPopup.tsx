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
    content: React.ReactNode;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ title, content }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const infoPopupTrigger = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className={styles.root} onClick={infoPopupTrigger}>
            <div className={styles.iconContainer}>
                <Icon size={30} name="info" />
            </div>
            <Popup
                active={isOpen}
                title={title}
                message={content as any} // Casting here because Popup.tsx still expects string for 'message'
                buttonText={t("components-infoPopup-buttonText")}
                action={infoPopupTrigger}
            />
        </div>
    );
}

export default InfoPopup;
