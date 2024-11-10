import React from 'react';

// Components
import Icon from '../../Icon';

// CSS
import styles from './itemSingleData.module.css';

const ItemSingleData = props => {
    const {
        data
    } = props;

    return (
        <li className={styles.root}>
            <Icon
                size={60}
                name={data.icon}
            />
            <p className={styles.itemName}>{data.name}</p>
            <p className={styles.itemValue}>{data.value}</p>
        </li>
    );
}

export default ItemSingleData;
