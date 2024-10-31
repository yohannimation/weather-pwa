import React, { useState, useEffect } from 'react';

import styles from './headerDataContainer.module.css'

const HeaderDataContainer = props => {
    const {
        title,
        infoData
    } = props;

    return (
        <div className={styles.root}>
            <p className={styles.headerTitle}>{title}</p>
            {/* miButton class = More Info button */}
            <div className={styles.miButton}>
                <img src='/logo512.png' alt='reload button'/>
            </div>
        </div>
    );
}

export default HeaderDataContainer;
