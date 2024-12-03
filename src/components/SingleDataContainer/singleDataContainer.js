import React from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Components
import ItemSingleData from './ItemSingleData'

// CSS
import styles from './singleDataContainer.module.css';

const SingleDataContainer = props => {
    const { t, i18n } = useTranslation();

    const {
        data
    } = props;

    var listData, errorMsg;
    if (
        "left" in data[0] && data[0].left !== null &&
        "right" in data[0] && data[0].right !== null
    ) {
        listData = data.map((item, index) => {
            return (
                <ItemSingleData key={index} data={item}/>
            );
        })
    } else {
        errorMsg = <li className={styles.error}>{t("components-singleDataContainer-errorMessage")}</li>;
    }

    return (
        <ul className={styles.root}>
            {errorMsg !== undefined ? errorMsg : listData}
        </ul>
    );
}

export default SingleDataContainer;
