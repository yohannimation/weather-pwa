import { useEffect, useRef, useState } from "react";

// Type
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const useInstallBanner = () => {
    const [isPromptReady, setIsPromptReady] = useState(false);
    const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        console.log('🔌 Listener beforeinstallprompt enregistré');
        const handlePrompt = (e: BeforeInstallPromptEvent) => {
                e.preventDefault();
                deferredPrompt.current = e;
                setIsPromptReady(true);
            };
            window.addEventListener('beforeinstallprompt', handlePrompt as EventListener);
            
            return () => window.removeEventListener('beforeinstallprompt', handlePrompt as EventListener);
        }, []);

    const installPWA = async () => {
        if (!deferredPrompt.current) {
            setIsPromptReady(false);
            return;
        }
    
        await deferredPrompt.current.prompt();
        const { outcome } = await deferredPrompt.current.userChoice;
    
        if (outcome === 'accepted') {
            localStorage.setItem('pwa-is-installed', 'true');
            setIsPromptReady(false);
        }
    
        deferredPrompt.current = null;
    };

    return { isPromptReady, installPWA };
};