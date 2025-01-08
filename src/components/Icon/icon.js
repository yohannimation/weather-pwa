import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// CSS
import styles from './icon.module.css';

const Icon = props => {
    const { t, i18n } = useTranslation();
    
    const {
        size,
        name
    } = props;

    const [iconClass, setIconClass] = useState();
    const [iconPath, setIconPath] = useState();
    const [iconAlt, setIconAlt] = useState();

    const iconSizeTreatment = (size) => {
        switch (size) {
            case 24:
                setIconClass(styles.xs);
                break;
    
            case 26:
                setIconClass(styles.s);
                break;
    
            case 28:
                setIconClass(styles.m);
                break;
    
            case 30:
                setIconClass(styles.l);
                break;
    
            case 40:
                setIconClass(styles.xl);
                break;

            case 45:
                setIconClass(styles.searchBarSize);
                break;

            case 60:
                setIconClass(styles.big);
                break;
    
            default:
                break;
        }
    }

    const iconPathTreatment = (name) => {
        const regex = new RegExp('weatherIcon');
        
        // name with "weatherIcon=XX_*" content match
        if (regex.test(name)) {
            const attributes = name.split('_')

            const cloudyCodeArray = ["1", "2", "3"];
            const fogyCodeArray = ["45", "48"];
            const rainyCodeArray = ["51", "53", "55", "56", "57", "61", "63", "65", "66", "67", "80", "81", "82"];
            const snowyCodeArray = ["71", "73", "75", "77", "85", "86"];
            const thunderstormCodeArray = ["95", "96", "99"];

            const weatherCode = attributes[0].split("=")[1];

            // day or night treatment
            var dayOrNightPath;
            if (
                attributes[1].split("=")[1] === "true" ||
                attributes[1].split("=")[1] === "1"
            ) {
                dayOrNightPath = "day/";
            } else {
                dayOrNightPath = "night/";
            }

            // is animate treatment
            var isAnimatePath;
            if (
                attributes[2].split("=")[1] === "true" ||
                attributes[2].split("=")[1] === "1"
            ) {
                isAnimatePath = "animate/";
            } else {
                isAnimatePath = "";
            }

            var codeName;
            if (weatherCode === "0")
                codeName = "clear";
    
            if (cloudyCodeArray.includes(weatherCode))
                codeName = "cloudy";
    
            if (fogyCodeArray.includes(weatherCode))
                codeName = "fogy";
    
            if (rainyCodeArray.includes(weatherCode))
                codeName = "rainy";
    
            if (snowyCodeArray.includes(weatherCode))
                codeName = "snowy";
    
            if (thunderstormCodeArray.includes(weatherCode))
                codeName = "thunderstorm";

            setIconPath("/icon/" + dayOrNightPath + isAnimatePath + codeName + ".gif");
            setIconAlt(codeName);
        } else {
            setIconAlt(name);
            setIconPath("/icon/" + name + ".png");
        }
    }

    useEffect(() => {   
        iconSizeTreatment(size);
        iconPathTreatment(name);
    }, [size, name]);

    return (
        <div className={iconClass}>
            <img className={styles.img} src={iconPath} alt={t("components-icon-iconAlt-" + iconAlt)} />
        </div>
    );
}

export default Icon;
