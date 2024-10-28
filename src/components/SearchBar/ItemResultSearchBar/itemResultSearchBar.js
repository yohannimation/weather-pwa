import React from 'react';

import styles from './itemResultSearchBar.module.css';

const ItemResultSearchBar = props => {
    const {
        countryCode,
        countryName,
        cityName
    } = props;

    const imgAlt = countryName + " flag";
    const imgSrc = "https://flagsapi.com/" + countryCode + "/flat/64.png"

    return (
        <div className={styles.root}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={imgSrc} alt={imgAlt} />
            </div>
            <p className={styles.cityName}>{cityName} - <span className={styles.countryCode}>{countryCode}</span></p>
        </div>
    );
}

export default ItemResultSearchBar;
