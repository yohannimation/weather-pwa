import React, { useState, useEffect } from 'react';

import styles from './popup.module.css'

import Button from '../Button';
import Title from '../Title';

const Popup = props => {
    const {
        active,
        title,
        message,
        buttonText,
        action
    } = props;

    const [rootClass, setRootClass] = useState(styles.unactive);

    useEffect(() => {
        if (active) {
            setRootClass(styles.root)
        }
    }, [active])

    return (
        <div className={rootClass}>
            <span className={styles.background}></span>
            <div className={styles.container}>
                <Title size={2}>{title}</Title>
                <p className={styles.message}>{message}</p>
                <Button triggerAction={action}>{buttonText}</Button>
            </div>
        </div>
    );
}

export default Popup;
