import React, { useState, useEffect } from 'react';

import { setCookies } from "../../components/LocalStorage/useSetter";
import { getCookies } from "../../components/LocalStorage/useGetter";
import { useTranslation } from 'react-i18next';

import Button from '../Button';
import Title from '../Title';

import styles from './cookieModal.module.css'

const CookieModal = () => {
    const { t, i18n } = useTranslation();

    const [cookieAccepted, setCookieAccepted] = useState(getCookies());
    const [closeModal, setCloseModal] = useState(styles.rootClosed);

    const handdleCookieAccepted = () => {
        setCookieAccepted(true);
    }

    useEffect(() => {
        if (cookieAccepted) {
            setCloseModal(styles.rootClosed);
        } else {
            setTimeout(() => {
                setCloseModal(styles.rootOpened);
            }, 1000);
        }
        setCookies(cookieAccepted)
    }, [cookieAccepted])


      

    return (
        <div className={closeModal}>
            <div className={styles.modal}>
                <Title size={1}>{t('cookieModal.componentTitle')}</Title>
                <p>
                    {t('cookieModal.modalContent.message')}<br/>
                    {t('cookieModal.modalContent.commercialPurposes')}
                </p>
                <div className={styles.buttonContainer}>
                    <Button onClickReturn={handdleCookieAccepted}>Accepter</Button>
                </div>
            </div>
        </div>
    );
}

export default CookieModal;
