import React, { useState, useEffect } from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// API Services
import { searchCities, saveSearchAndRedirect } from '../../../services/api/geoService';
import { City } from '../../../types';

// Components
import ItemResultSearchBar from '../ItemResultSearchBar';

// CSS
import styles from './resultSearchBar.module.css';

interface ResultSearchBarProps {
    inputValue: string;
    isOpen: boolean;
}

const ResultSearchBar: React.FC<ResultSearchBarProps> = ({ inputValue, isOpen }) => {
    const { t } = useTranslation();

    const [isSearching, setIsSearching] = useState(false);
    const [requestedResultList, setRequestedResultList] = useState<City[]>([]);
    const [modalClass, setModalClass] = useState(styles.rootUnactive);

    useEffect(() => {
        const performSearch = async () => {
            setIsSearching(true);
            try {
                const citiesData = await searchCities(inputValue);
                setRequestedResultList(citiesData || []);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsSearching(false);
            }
        };

        if (inputValue) {
            performSearch();
        } else {
            setRequestedResultList([]);
        }
    }, [inputValue]);

    useEffect(() => {
        setModalClass(isOpen ? styles.root : styles.rootUnactive);
    }, [isOpen]);

    const renderResults = () => {
        if (requestedResultList.length === 0 && !isSearching) {
            return <p className={styles.noResult}>{t("components-searchBar-resultSearchBar-noResult")}</p>;
        }

        return requestedResultList.map((item, index) => (
            <li key={index} onMouseDown={() => {
                saveSearchAndRedirect(item);
            }}>
                <ItemResultSearchBar
                    countryCode={item.country_code}
                    countryName={item.name_country}
                    cityName={item.name_city}
                />
            </li>
        ));
    };

    return (
        <div className={modalClass}>
            {isSearching ? (
                <div className={styles.loaderContainer}>loader</div>
            ) : (
                <ul className={styles.listContainer}>
                    {renderResults()}
                </ul>
            )}
        </div>
    );
}

export default ResultSearchBar;
