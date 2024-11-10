import React, { useState, useEffect }  from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Helmet
import { Helmet } from "react-helmet";

// Components
import LocationForm from '../../components/LocationForm';

// CSS
import styles from './locate.module.css';

const Locate = () => {
    const { t, i18n } = useTranslation();


    return (
        <main className={styles.root}>
            <div className={styles.logoContainer}>

            </div>
            <div className={styles.container}>
                <LocationForm />
            </div>
        </main>
    );
}

export default Locate;
