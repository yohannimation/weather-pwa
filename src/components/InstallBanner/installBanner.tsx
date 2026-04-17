import React, { useState, useEffect, useRef } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Components
import Button from '../Button';

// CSS
import styles from './installBanner.module.css';

interface InstallBannerProps {
    closable?: boolean;
}

const InstallBanner: React.FC<InstallBannerProps> = ({ closable }) => {
    const { t } = useTranslation();

    const [installBannerOpen, setInstallBannerOpen] = useState(false);
    const deferredPrompt = useRef<any>(null);

    useEffect(() => {
        const handlePrompt = (e: any) => {
            e.preventDefault();
            deferredPrompt.current = e;
            setInstallBannerOpen(true);
        }

        window.addEventListener('beforeinstallprompt', handlePrompt);
        return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
    }, []);

    const installPWA = async () => {
        if (!deferredPrompt.current) {
            setInstallBannerOpen(false);
            return;
        }

        deferredPrompt.current.prompt();

        const { outcome } = await deferredPrompt.current.userChoice;
        if (outcome === 'accepted') {
            setInstallBannerOpen(false);
            localStorage.setItem("pwa-is-installed", 'true');
        }
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
