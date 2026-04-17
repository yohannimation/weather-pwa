import React, { useState, useEffect } from 'react';

// CSS
import styles from './booleanSlider.module.css';

interface BooleanSliderProps {
    values: { [key: string]: string };
    defaultValue?: string;
    returnValue: (value: string) => void;
}

const BooleanSlider: React.FC<BooleanSliderProps> = ({ values, defaultValue, returnValue }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue ? defaultValue : "default");
    const [sliderClass, setSliderClass] = useState(styles.defaultSelected);

    const setDefaultValue = () => {
        setSelectedValue("default");
    }
    const setSecondaryValue = () => {
        setSelectedValue("secondary");
    }

    useEffect(() => {
        if (selectedValue) {
            if (selectedValue === "default")
                setSliderClass(styles.defaultSelected);
            else
                setSliderClass(styles.secondarySelected);
        }
        returnValue(selectedValue);
    }, [selectedValue, returnValue]);

    if (!values.default || !values.secondary) {
        return (
            <div className={styles.root}>
                <div className={sliderClass}>
                    <p className={styles.error}>Slider values error</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={sliderClass}>
                <div className={styles.slider}>
                    <p className={styles.defaultValue} onClick={setDefaultValue}>{values.default}</p>
                    <p className={styles.secondaryValue} onClick={setSecondaryValue}>{values.secondary}</p>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default BooleanSlider;
