import React from 'react';

// Components
import Button from '../Button';
import Icon from '../Icon';
import Title from '../Title';

// CSS
import styles from './modal.module.css';

interface ModalProps {
    active: boolean;
    title: string;
    message: React.ReactNode;
    buttonText: string;
    action: () => void;
    closeCallback?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    active,
    title,
    message,
    buttonText,
    action,
    closeCallback
}) => {
    if (!active) return

    return (
        <div className={styles.root}>
            <span className={styles.background} onClick={closeCallback}></span>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Title size={2}>{title}</Title>
                    {closeCallback && (
                        <span className={styles.closeButton} onClick={closeCallback}>
                            <Icon size={30} name="close" />
                        </span>
                    )}
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
