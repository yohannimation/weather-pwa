import React from 'react';

import styles from './button.module.css'

const Button = props => {
    const { children, triggerAction } = props;

    return (
        <button className={styles.root} onClick={triggerAction}>
            {children}
        </button>
    );
}

export default Button;
