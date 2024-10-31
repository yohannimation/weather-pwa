import React, { useState, useEffect } from 'react';

import { cookiesAccepted } from "./useCookieModal";

import { getCookies } from "../LocalStorage/useGetter";
import { setError, setErrorTitle, setErrorMessage } from "../LocalStorage/useSetter";

import Modal from '../Modal';

const CookieModal = () => {
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
                title="Cookie modal"
                message="Veuillez accepter les cookie svp"
                buttonText="Accepter"
                action={modalActionTrigger}
            />
        </>
    )
}

export default CookieModal;
