import React from 'react';

// Components
import Button from 'components/Button';
import Title from 'components/Title';

// CSS
import styles from './popup.module.css';

interface PopupProps {
    active: boolean;
    title: string;
    message: React.ReactNode | string;
    buttonText: string;
    action: () => void;
}

const Popup: React.FC<PopupProps> = ({ active, title, message, buttonText, action }) => {
    if (!active) return

    return (
        <div className={styles.root}>
            <span className={styles.background} onClick={action}></span>
            <div className={styles.container}>
                <Title size={2}>{title}</Title>
                <span className={styles.message}>{message}</span>
                <Button triggerAction={action}>{buttonText}</Button>
            </div>
        </div>
    );
}

export default Popup;
