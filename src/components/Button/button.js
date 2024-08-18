import React from 'react';

import styles from './button.module.css'

const Button = props => {
    const { children, onClickReturn } = props;

    return (
        <button className={styles.root} onClick={onClickReturn}>
            {children}
        </button>
    );
}

export default Button;
