import React, { useState, useEffect } from 'react';

import Loading from '../Loading/';

import styles from './searchBarModal.module.css'

const SearchBarModal = props => {
    const { displayModal, isLoading, data, returnValue } = props;
    var list;

    const [modalClass, setModalClass] = useState(styles.closedModal);
    const [loadingClass, setLoadingClass] = useState(styles.loadingOff);
    const [selectedValue, setSelectedValue] = useState({});

    const handdleValueSelected = (cityName, cityLatitude, cityLongitude) => {
        setSelectedValue({
            "cityName": cityName,
            "cityLatitude": cityLatitude,
            "cityLongitude": cityLongitude
        });

    }

    useEffect(() => {
        if (displayModal) {
            setModalClass(styles.openedModal);
        } else {
            setModalClass(styles.closedModal);
        }
    }, [displayModal])

    useEffect(() => {
        if (isLoading) {
            setLoadingClass(styles.loadingOn);
        } else {
            setLoadingClass(styles.loadingOff);
        }
    }, [isLoading])

    useEffect(() => {
        returnValue(selectedValue);
    }, [selectedValue])

    if (
        data !== undefined &&
        Object.keys(data).length
    ) {
        list = data.map((city) => {
            const countryFlagUrl = "https://flagsapi.com/" + city.country_code + "/flat/64.png";

            return (
                <li
                    key={city.id}
                    className={styles.item}
                    onClick={() => handdleValueSelected(city.name, city.latitude, city.longitude)}
                >
                    <div className={styles.flagContainer}>
                        <img src={countryFlagUrl} className={styles.flagImg} />
                    </div>
                    <div className={styles.textContainer}>
                        <span className={styles.cityName}>
                            {city.name}
                        </span>
                        &nbsp;-&nbsp;
                        <span className={styles.countryName}>
                            {city.country}
                        </span>
                    </div>
                </li>
            );
        })
    } else {
        list = (
            <li className={styles.item}>
                <div className={styles.flagContainer}>
                </div>
                <div className={styles.textContainer}>
                    <span className={styles.cityName}>
                        Pas de donnée
                    </span>
                </div>
            </li>
        );
    }


    return (
        <div className={modalClass}>
            <div className={loadingClass}>
                <Loading />
            </div>
            <ul className={styles.listContainer}>
                {list}
            </ul>
        </div>
    );
}

export default SearchBarModal;
