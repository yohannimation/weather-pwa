import React from 'react';

// Components
import InfoPopup from 'components/InfoPopup';

// CSS
import styles from './headerDataContainer.module.css';

interface HeaderDataContainerProps {
    title: string;
    infoData: React.ReactNode;
}

const HeaderDataContainer: React.FC<HeaderDataContainerProps> = ({ title, infoData }) => {
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
