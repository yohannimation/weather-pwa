import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Setter - Getter
import { getCookies } from "../LocalStorage/useGetter";

// Component use
import { cookiesAccepted } from "./useCookieModal";

// Components
import Modal from '../Modal';

const CookieModal = () => {
    const { t, i18n } = useTranslation();

    const [modalActive, setModalActive] = useState(false);

    // Set cookie accepted in localStorage
    const modalActionTrigger = () => {
        if (cookiesAccepted()) {
            setModalActive(false);
        }
    }

    // Display cookieModal after 1sec if it is not accepted
    setTimeout(() => {
        if (getCookies() !== "true")
            setModalActive(true)
    }, 1000);

    return (
        <>
            <Modal
                active={modalActive}
                title={t("components-cookieModal-title")}
                message={t("components-cookieModal-message")}
                buttonText={t("components-cookieModal-buttonText")}
                action={modalActionTrigger}
            />
        </>
    )
}

export default CookieModal;
