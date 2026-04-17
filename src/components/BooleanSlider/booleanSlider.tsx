import React, { useState } from 'react';

// CSS
import styles from './booleanSlider.module.css';

interface BooleanSliderProps {
    values: { [key: string]: string };
    defaultValue?: string;
    returnValue: (value: string) => void;
}

const BooleanSlider: React.FC<BooleanSliderProps> = ({ values, defaultValue, returnValue }) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        returnValue(value);
    };

    const sliderClass = selectedValue === "default" 
        ? styles.defaultSelected 
        : styles.secondarySelected;

    if (!values.default || !values.secondary) {
        return (
            <div className={styles.root}>
                <div className={styles.defaultSelected}>
                    <p className={styles.error}>Slider values error</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={sliderClass}>
                <div className={styles.slider}>
                    <p className={styles.defaultValue} onClick={() => handleSelect("default")}>
                        {values.default}
                    </p>
                    <p className={styles.secondaryValue} onClick={() => handleSelect("secondary")}>
                        {values.secondary}
                    </p>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default BooleanSlider;
