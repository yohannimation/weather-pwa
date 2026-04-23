import React from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Context
import { useError } from 'contexts/ErrorContext';

// Components
import Popup from 'components/Popup';

const ErrorPopup: React.FC = () => {
    const { t } = useTranslation();
    const { error, clearError } = useError();

    return (
        <Popup
            active={error.active}
            title={error.title}
            message={error.message}
            buttonText={t("components-errorPopup-buttonText")}
            action={clearError}
        />
    );
}

export default ErrorPopup;
