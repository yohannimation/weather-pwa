import React, { useState, useEffect } from 'react';

// Setter - Getter
import { getTimezone } from "../LocalStorage/useGetter";
import { setTimezone } from "../LocalStorage/useSetter";

import { getTimezones } from './useTimezoneSelector';

// Components
import Select from '../Select';

// CSS
import styles from './timezoneSelector.module.css'

const TimezoneSelector = () => {
    const [selectedValue, setSelectedValue] = useState(""); 
    const [timezones, setTimezones] = useState(); 

    const updateSelectedValue = (timezoneSelected) => {
        setTimezone(timezoneSelected);
        setSelectedValue(timezoneSelected);
    }

    
    useEffect(() => {
        const initFunction = async () => {
            console.log(await getTimezones())
            setTimezones(await getTimezones());
        }
        
        if (!timezones) {
            // setSelectedValue(getTimezone());
            initFunction()
        }
    }, [timezones])

    return (
        <div className={styles.root}>
            {
                timezones ?
                    <Select selectedValue={selectedValue} data={timezones} returnedValue={updateSelectedValue} />
                :
                    'An error occured'
            }
        </div>
    );
}

export default TimezoneSelector;
