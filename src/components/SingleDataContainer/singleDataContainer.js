import React from 'react';

import ItemSingleData from './ItemSingleData'

import styles from './singleDataContainer.module.css';

const SingleDataContainer = props => {
    const {
        data
    } = props;

    var listData, errorMsg;
    if (
        "name" in data[0] && data[0].name !== null &&
        "icon" in data[0] && data[0].icon !== null &&
        "value" in data[0] && data[0].value !== null
    ) {
        listData = data.map((item) => {
            return (
                <ItemSingleData data={item}/>
            );
        })
    } else {
        errorMsg = <li className={styles.error}>Single data error</li>;
    }

    return (
        <ul className={styles.root}>
            {errorMsg !== undefined ? errorMsg : listData}
        </ul>
    );
}

export default SingleDataContainer;
