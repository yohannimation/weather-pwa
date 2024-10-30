import React, { useState, useEffect } from 'react';

import styles from './modal.module.css'

import Button from '../Button';
import Title from '../Title';

const Modal = props => {
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
        } else {
            setRootClass(styles.unactive)
        }
    }, [active])

    // TODO when user click on the background, the modal will be close

    return (
        <div className={rootClass}>
            <span className={styles.background}></span>
            <div className={styles.container}>
                <Title size={2}>{title}</Title>
                <p className={styles.message}>{message}</p>
                <div className={styles.buttonContainer}>
                    <Button triggerAction={action}>{buttonText}</Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
