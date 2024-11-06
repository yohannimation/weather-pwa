import React, { useState, useEffect } from 'react';

import styles from './icon.module.css';

import iconList from './iconList.json';

const Icon = props => {
    const {
        size,
        name,
        code
    } = props;

    const [iconClass, setIconClass] = useState();
    const [iconName, setIconName] = useState();

    useEffect(() => {    
        if (name === "weather") {
            switch (code) {
                
            }
        } else {
            // setIconName("/icons/" + name);
            setIconName("/" + name);
        }
    
        switch (size) {
            case 24:
                setIconClass(styles.xs);
                break;
    
            case 26:
                setIconClass(styles.s);
                break;
    
            case 28:
                setIconClass(styles.m);
                break;
    
            case 30:
                setIconClass(styles.l);
                break;
    
            case 40:
                setIconClass(styles.xl);
                break;
    
            default:
                break;
        }
    }, [name]);

    return (
        <div className={iconClass}>
            <img className={styles.img} src={iconName} alt={name} />
        </div>
    );
}

export default Icon;
