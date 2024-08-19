import React, { useState, useEffect } from 'react';

import { getCityData } from './useSearchBar';

import SearchBarModal from '../SearchBarModal/searchBarModal';

import styles from './searchBar.module.css'

const SearchBar = props => {
    const { placeholder, returnValue } = props;
    const [inputValue, setInputValue] = useState("");
    const [cityData, setCityData] = useState({});
    const [displayModal, setDisplayModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setDisplayModal(false);
        setIsLoading(false);
    }

    const searchBarModalTreatment = (value) => {
        closeModal();
        returnValue(value);
    }

    const requestCityData = (inputValue) => {
        setInputValue(inputValue);
    }

    useEffect(() => {
        async function fetchCityData() {
            if (
                inputValue !== null &&
                inputValue !== ""
            ) {
                setDisplayModal(true);
                setIsLoading(true);
                try {
                    setCityData(await getCityData(inputValue));
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                }
            } else {
                closeModal();
            }
        }

        fetchCityData();
    }, [inputValue])

    return (
        <div className={styles.root}>
            <input
                type='search'
                className={styles.inputSearch}
                onChange={(e) => requestCityData(e.target.value)}
                placeholder={placeholder}
            />
            <div className={styles.modalContainer}>
                <SearchBarModal
                    displayModal={displayModal}
                    isLoading={isLoading}
                    data={cityData}
                    returnValue={searchBarModalTreatment} 
                />
            </div>
        </div>
    );
}

export default SearchBar;
