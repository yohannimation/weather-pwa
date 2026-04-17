import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// CSS
import styles from './icon.module.css';

interface IconProps {
    size: number;
    name: string;
}

const Icon: React.FC<IconProps> = ({ size, name }) => {
    const { t } = useTranslation();

    const [iconClass, setIconClass] = useState<string>();
    const [iconPath, setIconPath] = useState<string>();
    const [iconAlt, setIconAlt] = useState<string>();

    const iconSizeTreatment = (s: number) => {
        switch (s) {
            case 24: setIconClass(styles.xs); break;
            case 30: setIconClass(styles.s); break;
            case 40: setIconClass(styles.l); break;
            case 50: setIconClass(styles.xl); break;
            case 60: setIconClass(styles.big); break;
            case 180: setIconClass(styles.animatedIcon); break;
            default: break;
        }
    }

    const iconPathTreatment = (n: string) => {
        const regex = /weatherIcon/;

        if (regex.test(n)) {
            const attributes = n.split('_');
            const cloudyCodeArray = ["1", "2", "3"];
            const fogyCodeArray = ["45", "48"];
            const rainyCodeArray = ["51", "53", "55", "56", "57", "61", "63", "65", "66", "67", "80", "81", "82"];
            const snowyCodeArray = ["71", "73", "75", "77", "85", "86"];
            const thunderstormCodeArray = ["95", "96", "99"];

            const weatherCode = attributes[0]?.split("=")[1];

            const dayOrNightPath = (attributes[1]?.split("=")[1] === "true" || attributes[1]?.split("=")[1] === "1")
                ? "day/"
                : "night/";

            const isAnimate = (attributes[2]?.split("=")[1] === "true" || attributes[2]?.split("=")[1] === "1");
            const isAnimatePath = isAnimate ? "animate/" : "";
            const fileExtension = isAnimate ? ".gif" : ".png";

            let codeName: string = 'clear';
            if (weatherCode && cloudyCodeArray.includes(weatherCode)) codeName = "cloudy";
            else if (weatherCode && fogyCodeArray.includes(weatherCode)) codeName = "fogy";
            else if (weatherCode && rainyCodeArray.includes(weatherCode)) codeName = "rainy";
            else if (weatherCode && snowyCodeArray.includes(weatherCode)) codeName = "snowy";
            else if (weatherCode && thunderstormCodeArray.includes(weatherCode)) codeName = "thunderstorm";

            setIconPath(`/icon/${dayOrNightPath}${isAnimatePath}${codeName}${fileExtension}`);
            setIconAlt(codeName);
        } else {
            setIconAlt(n);
            setIconPath(`/icon/${n}.png`);
        }
    }

    useEffect(() => {
        iconSizeTreatment(size);
        iconPathTreatment(name);
    }, [size, name]);

    return (
        <div className={iconClass}>
            <img
                className={styles.img}
                src={iconPath}
                alt={t(`components-icon-iconAlt-${iconAlt}`)}
                loading="lazy"
            />
        </div>
    );
}

export default Icon;
