import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Component logic
import { useCookieModal } from "./useCookieModal";

// Components
import Modal from '../Modal';

const CookieModal: React.FC = () => {
    const { t } = useTranslation();
    const { checkCookiesAccepted, acceptCookies } = useCookieModal();
    const [modalActive, setModalActive] = useState(false);
    const cookieModalDisplayDelay = 500;

    const modalActionTrigger = () => {
        acceptCookies()
        setModalActive(false);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!checkCookiesAccepted())
                setModalActive(true);
        }, cookieModalDisplayDelay);
        
        return () => clearTimeout(timer);
    }, [checkCookiesAccepted]);

    if (!modalActive) return;

    return (
        <Modal
            active={modalActive}
            title={t("components-cookieModal-title")}
            message={t("components-cookieModal-message")}
            buttonText={t("components-cookieModal-buttonText")}
            action={modalActionTrigger}
        />
    );
}

export default CookieModal;
