import React from 'react';

// Components
import InputSearchBar from '../SearchBar/InputSearchBar';

// CSS
import styles from './locationForm.module.css';

const LocationForm: React.FC = () => {
    return (
        <div className={styles.root}>
            <InputSearchBar />
        </div>
    );
}

export default LocationForm;
