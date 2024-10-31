import React, { useState, useEffect } from 'react';

import styles from './dataContainer.module.css'

import HeaderDataContainer from './HeaderDataContainer';

const DataContainer = props => {
    const {
        title,
        infoData,
        isHorizontal,
        weatherData
    } = props;

    

    return (
        <div className={styles.root}>
            <HeaderDataContainer
                title={title}
                infoData={infoData}
            />
            <div className={styles.container}>

            </div>
        </div>
    );
}

export default DataContainer;
