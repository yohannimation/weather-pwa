import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Setter - Getter
import { getCookies } from "../LocalStorage/useGetter";

// Component logic
import { cookiesAccepted } from "./useCookieModal";

// Components
import Modal from '../Modal';

const CookieModal: React.FC = () => {
    const { t } = useTranslation();
    const [modalActive, setModalActive] = useState(false);

    const modalActionTrigger = () => {
        if (cookiesAccepted()) {
            setModalActive(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (getCookies() !== "true")
                setModalActive(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

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
