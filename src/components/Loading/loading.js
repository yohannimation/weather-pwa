import React, { useState, useEffect } from 'react';

// CSS
import styles from './loading.module.css'

const Loading = props => {
    const {
        isLoading
    } = props;
    
    const [rootClass, setRootClass] = useState(styles.unactive);

    useEffect(() => {
        if (isLoading) {
            setRootClass(styles.root);
        } else {
            setRootClass(styles.unactive);
        }
    }, [isLoading])

    return (
        <div className={rootClass}>
            <div className={styles.spinner}>

            </div>
            <span className={styles.background}></span>
        </div>
    );
}

export default Loading;
