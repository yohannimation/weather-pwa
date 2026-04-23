import React from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Components
import ItemSingleData from './ItemSingleData';

// CSS
import styles from './singleDataContainer.module.css';
import { TodayWeatherPair } from 'types';

interface SingleDataContainerProps {
    data: TodayWeatherPair[];
}

const SingleDataContainer: React.FC<SingleDataContainerProps> = ({ data }) => {
    const { t } = useTranslation();

    if (!data || data.length === 0 || !data[0] || !('left' in data[0])) {
        return (
            <ul className={styles.root}>
                <li className={styles.error}>{t("components-singleDataContainer-errorMessage")}</li>
            </ul>
        );
    }

    return (
        <ul className={styles.root}>
            {data.map((item, index) => (
                <ItemSingleData key={index} data={item}/>
            ))}
        </ul>
    );
}

export default SingleDataContainer;
