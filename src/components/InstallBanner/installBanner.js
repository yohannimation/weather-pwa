import React, { useState, useEffect, useRef  } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Components
import Button from '../Button';

// CSS
import styles from './installBanner.module.css'

const InstallBanner = props => {
    const { t, i18n } = useTranslation();

    const [installBannerOpen, setInstallBannerOpen] = useState(false);
    const deferredPrompt = useRef(null)

    useEffect(() => {
        const handlePrompt = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt.current = e;

            setInstallBannerOpen(e);
        }

        window.addEventListener('beforeinstallprompt', handlePrompt);
        return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
    })

    const installPWA = () => {
        if (!deferredPrompt.current) {
            setInstallBannerOpen(false);
            return
        }

        deferredPrompt.current.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.current.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                setInstallBannerOpen(false);
                localStorage.setItem("pwa-is-installed", 'true');
            }
        })
    }

    return (
        <div className={installBannerOpen ? styles.root : styles.rootClosed}>
            <p>{t("components-installBanner-cta")}</p>
            <Button triggerAction={installPWA}>
                {t("components-installBanner-installButton")}
            </Button>
        </div>
    )
}

export default InstallBanner;
