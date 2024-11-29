import React, { useState, useEffect } from 'react';

// Data
import iconList from './iconList.json';

// CSS
import styles from './icon.module.css';

const Icon = props => {
    const {
        size,
        path,
        code
    } = props;

    const [iconClass, setIconClass] = useState();
    const [iconName, setIconName] = useState();

    useEffect(() => {
        setIconName(path + ".png");
    
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

            case 45:
                setIconClass(styles.searchBarSize);
                break;

            case 60:
                setIconClass(styles.big);
                break;
    
            default:
                break;
        }
    }, [path]);

    return (
        <div className={iconClass}>
            <img className={styles.img} src={iconName} alt={path} />
        </div>
    );
}

export default Icon;
