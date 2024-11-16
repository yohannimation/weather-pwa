import React from 'react';

// Components
import Icon from '../../../Icon';

// CSS
import styles from './horizontalItemData.module.css'

const HorizontalItemData = props => {
    const {
        data
    } = props;

    /**
     * data must be
     *  [
     *      {
     *          "time": "timeValue",
     *          "icon": "img.png",
     *          "temperature": {
     *              "variation": "down",    can be "down", "rise", "equal"
     *              "value": XX
     *          },
     *          "precipitation": XX
     *      },
     *  ]
     */

    var errorMsg, listData;

    // Check if minimum 7 data are declared and valid
    if (
        "time" in data[0] && data[0].time !== null &&
        "icon" in data[0] && data[0].icon !== null &&
        "temperature" in data[0] &&
        "variation" in data[0].temperature && data[0].temperature.variation !== null &&
        "value" in data[0].temperature && data[0].temperature.value !== null &&
        "precipitation" in data[0] && data[0].precipitation !== null &&
        data.length >= 7
    ) {
        listData = data.map((item) => {
            return (
                <li key={item.time} className={styles.item}>
                    <p className={styles.hour}>{item.time}</p>
                    <Icon
                        size={40}
                        name={item.icon}
                        code={14}
                    />
                    <div className={styles.temperature}>
                        <Icon
                            size={24}
                            name={item.icon}
                            code={14}
                        />
                        {item.temperature.value}
                    </div>
                    <div className={styles.precipitation}>
                        <Icon
                            size={24}
                            name={item.icon}
                            code={14}
                        />
                        {item.precipitation}
                    </div>
                </li>
            );
        })
    } else {
        errorMsg = <li className={styles.error}>Horizontal items error</li>;
    }

    return (
        <>
            {errorMsg !== undefined ? errorMsg : listData}
        </>
    );
}

export default HorizontalItemData;
