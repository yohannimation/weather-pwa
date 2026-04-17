import React from 'react';

// CSS
import styles from './button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    triggerAction: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, triggerAction }) => {
    return (
        <button className={styles.root} onClick={triggerAction}>
            {children}
        </button>
    );
}

export default Button;
