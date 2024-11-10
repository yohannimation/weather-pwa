import React from 'react';

// Components
import InfoPopup from '../../InfoPopup';

// CSS
import styles from './headerDataContainer.module.css'

const HeaderDataContainer = props => {
    const {
        title,
        infoData
    } = props;

    return (
        <div className={styles.root}>
            <p className={styles.headerTitle}>{title}</p>
            <div className={styles.infoButton}>
                <InfoPopup
                    title={title}
                    content={infoData}
                />
            </div>
        </div>
    );
}

export default HeaderDataContainer;
