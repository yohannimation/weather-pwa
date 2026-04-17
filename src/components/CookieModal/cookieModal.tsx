import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// User Context
import { useUser } from '../../contexts/UserContext';

// Component logic
import { cookiesAccepted } from "./useCookieModal";

// Components
import Modal from '../Modal';

const CookieModal: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const [modalActive, setModalActive] = useState(false);

    const modalActionTrigger = () => {
        if (cookiesAccepted()) {
            setModalActive(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user.cookies)
                setModalActive(true);
        }, 500);
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
