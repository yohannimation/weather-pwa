import React, { useState, useEffect } from 'react';

import styles from './dataContainer.module.css'

import HeaderDataContainer from './HeaderDataContainer';
import VerticalItemData from './ItemData/VerticalItemData';
import HorizontalItemData from './ItemData/HorizontalItemData';

const DataContainer = props => {
    const {
        title,
        infoData,
        isHorizontal,
        weatherData
    } = props;

    /**
     * Horizontal
     * [
     *      [
     *          time (like 12:00)
     *          icon src
     *          temperature [
     *              variation (rise, equal, down)
     *              value
     *          ]
     *          precipitation value
     *      ]
     *      [
     *          time (like 13:00)
     *          icon src
     *          temperature [
     *              variation (rise, equal, down)
     *              value
     *          ]
     *          precipitation value
     *      ]
     * ]
     * 
     * Vertical
     * [
     *      [
     *          day name (like Lundi)
     *          icon src
     *          precipitation value
     *          temperature [
     *              max daily value
     *              min daily value
     *          ]
     *      ]
     * ]
     */



    const containerClass = isHorizontal ? styles.horizontalClass : styles.verticalClass;
    const items = isHorizontal ? <HorizontalItemData data={weatherData}/> : <VerticalItemData data={weatherData}/>;

    return (
        <div className={styles.root}>
            <HeaderDataContainer
                title={title}
                infoData={infoData}
            />
            <ul className={containerClass}>
                {items}
            </ul>
        </div>
    );
}

export default DataContainer;
