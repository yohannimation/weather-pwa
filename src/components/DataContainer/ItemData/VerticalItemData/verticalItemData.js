import React from 'react';

// Component
import Icon from '../../../Icon';

// CSS
import styles from './verticalItemData.module.css'


const VerticalItemData = props => {
    const {
        data
    } = props;

    /**
     * data must be
     *  [
     *      {
     *          "day": "dayName",
     *          "icon": "img.png",
     *          "temperature": {
     *              "maxDaily": XX,
     *              "minDaily": XX
     *          },
     *          "precipitation": XX
     *      },
     *  ]
     */

    var errorMsg, listData;

    // Check if minimum 4 data and maximum 7 data are declared and valid
    if (
        "day" in data[0] && data[0].day !== null &&
        "icon" in data[0] /*&& data[0].icon !== null */&&
        "temperature" in data[0] &&
        "max" in data[0].temperature && data[0].temperature.max !== null &&
        "min" in data[0].temperature && data[0].temperature.min !== null &&
        "precipitation" in data[0] &&
        "probability" in data[0].precipitation /*&& data[0].precipitation.probability !== null*/ &&
        "maximumValue" in data[0].precipitation /*&& data[0].precipitation.maximumValue !== null*/ &&
        data.length >= 4 &&
        data.length <= 7
    ) {
        listData = data.map((item, index) => {
            return (
                <li key={index} className={styles.item}>
                    <p className={styles.day}>{item.day}</p>
                    <div className={styles.weatherIconContainer}>
                        <Icon
                            size={40}
                            name={item.icon}
                        />
                    </div>
                    <div className={styles.precipitation}>
                        <Icon
                            size={24}
                            name="precipitation"
                        />
                        {item.precipitation.maximumValue}
                    </div>
                    <div className={styles.temperatureContainer}>
                        <div className={styles.temperature}>
                            <Icon
                                size={24}
                                name="minTemp"
                            />
                            {item.temperature.min}
                        </div>
                        <div className={styles.temperature}>
                            <Icon
                                size={24}
                                name="maxTemp"
                            />
                            {item.temperature.max}
                        </div>
                    </div>
                </li>
            );
        })
    } else {
        errorMsg = <li className={styles.error}>Vertical items error</li>;
    }

    return (
        <>
            {errorMsg !== undefined ? errorMsg : listData}
        </>
    );
}

export default VerticalItemData;
