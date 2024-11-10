import React from 'react';

// CSS
import styles from './loading.module.css'

const Loading = props => {

    return (
        <div className={styles.root}>
            <div className={styles.spinner}>

            </div>
        </div>
    );
}

export default Loading;
