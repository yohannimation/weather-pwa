import React from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Component use
import { useInstallBanner } from './useInstallBanner';

// Components
import Button from 'components/Button';

// CSS
import styles from './installBanner.module.css';


const InstallBanner: React.FC = () => {
    const { t } = useTranslation();

    const { isPromptReady, installPWA } = useInstallBanner();

    if (!isPromptReady) return null;

    return (
        <div className={styles.root}>
            <p>{t("components-installBanner-cta")}</p>
            <Button triggerAction={installPWA}>
                {t("components-installBanner-installButton")}
            </Button>
        </div>
    );
}

export default InstallBanner;
