import React from 'react';

// Components
import LocationForm from 'components/LocationForm';

// CSS
import styles from './locate.module.css';

const Locate: React.FC = () => {
    return (
        <main className={styles.root}>
            <LocationForm />
        </main>
    );
}

export default Locate;
