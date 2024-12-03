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

    return (
        <li className={styles.root}>
            <div className={styles.item}>
                <Icon
                    size={60}
                    name={data.left.icon}
                />
                <p className={styles.itemName}>{t("components-singleDataContainer-itemSingleData-" + data.left.name)}</p>
                <p className={styles.itemValue}>{data.left.value ?? 0}</p>
            </div>
            <div className={styles.item}>
                <Icon
                    size={60}
                    name={data.right.icon}
                />
                <p className={styles.itemName}>{t("components-singleDataContainer-itemSingleData-" + data.right.name)}</p>
                <p className={styles.itemValue}>{data.right.value ?? 0}</p>
            </div>
        </li>
    );
}

export default ItemSingleData;
