import React from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Components
import Icon from '../../Icon';

// CSS
import styles from './itemSingleData.module.css';

const ItemSingleData = props => {
    const { t, i18n } = useTranslation();

    const {
        data
    } = props;

    const name = t("components-singleDataContainer-itemSingleData-" + data.name)

    return (
        <li className={styles.root}>
            <Icon
                size={60}
                name={data.icon}
            />
            <p className={styles.itemName}>{name}</p>
            <p className={styles.itemValue}>{data.value}</p>
        </li>
    );
}

export default ItemSingleData;
