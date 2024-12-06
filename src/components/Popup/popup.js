import React, { useState, useEffect } from 'react';

// Components
import Button from '../Button';
import Title from '../Title';

// CSS
import styles from './popup.module.css'

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
            setRootClass(styles.root);
        } else {
            setRootClass(styles.unactive);
        }
    }, [active])

    return (
        <div className={rootClass}>
            <span className={styles.background}></span>
            <div className={styles.container}>
                <Title size={2}>{title}</Title>
                <span className={styles.message}>{message}</span>
                <Button triggerAction={action}>{buttonText}</Button>
            </div>
        </div>
    );
}

export default Popup;
