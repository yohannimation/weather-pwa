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
        "name" in data[0] && data[0].name !== null &&
        "icon" in data[0] && data[0].icon !== null &&
        "value" in data[0] && data[0].value !== null
    ) {
        listData = data.map((item) => {
            return (
                <ItemSingleData data={item}/>
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
