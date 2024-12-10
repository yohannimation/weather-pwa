import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Components
import Button from '../Button';

// CSS
import styles from './installBanner.module.css'

const InstallBanner = props => {
    const { t, i18n } = useTranslation();

    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, [])

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    }

    if (!supportsPWA) {
        console.log("don't support PWA")

        return null;
    }

    return (
        <div className={styles.root}>
            <Button
                id="setup_button"
                onClick={onClick}
            >
                Installer la PWA
            </Button>
        </div>
    );
}

export default InstallBanner;
