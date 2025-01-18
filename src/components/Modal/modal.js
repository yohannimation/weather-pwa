import React, { useState, useEffect } from 'react';

// Components
import Button from '../Button';
import Icon from '../Icon';
import Title from '../Title';

// CSS
import styles from './modal.module.css'

const Modal = props => {
    const {
        active,
        title,
        message,
        buttonText,
        action,
        closeCallback = false
    } = props;

    const [rootClass, setRootClass] = useState(styles.unactive);

    useEffect(() => {
        if (active) {
            setRootClass(styles.root)
        } else {
            setRootClass(styles.unactive)
        }
    }, [active])

    return (
        <div className={rootClass}>
            <span className={styles.background}></span>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Title size={2}>{title}</Title>
                    {closeCallback ? <span className={styles.closeButton} onClick={closeCallback}><Icon size={30} name="close" /></span> : ""}
                </div>
                <span className={styles.message}>{message}</span>
                <div className={styles.buttonContainer}>
                    <Button triggerAction={action}>{buttonText}</Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
