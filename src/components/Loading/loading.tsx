import React from 'react';

// CSS
import styles from './loading.module.css';

interface LoadingProps {
    isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
    const [rootClass, setRootClass] = React.useState(styles.unactive);

    React.useEffect(() => {
        if (isLoading) {
            setRootClass(styles.root);
        } else {
            setRootClass(styles.unactive);
        }
    }, [isLoading]);

    return (
        <div className={rootClass}>
            <div className={styles.spinner}></div>
            <span className={styles.background}></span>
        </div>
    );
}

export default Loading;
