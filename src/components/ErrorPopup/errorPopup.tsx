import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Setter - Getter
import { getError, getErrorTitle, getErrorMessage } from '../LocalStorage/useGetter';
import { setError } from '../LocalStorage/useSetter';

// Component logic
import { checkError, reloadTrigger } from './useErrorPopup';

// Components
import Popup from '../Popup';

const ErrorPopup: React.FC = () => {
    const { t } = useTranslation();

    const [popupActive, setPopupActive] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMessage, setPopupMessage] = useState("");

    // Ensure error state is initialized
    useEffect(() => {
        if (!getError()) {
            setError(false);
        }
    }, []);

    // Check every 2.5s if an error is thrown
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (checkError() !== "false") {
                setPopupTitle(getErrorTitle() || "");
                setPopupMessage(getErrorMessage() || "");
                setPopupActive(true);
            }
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Popup
            active={popupActive}
            title={popupTitle}
            message={popupMessage}
            buttonText={t("components-errorPopup-buttonText")}
            action={reloadTrigger}
        />
    );
}

export default ErrorPopup;
