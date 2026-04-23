import React from 'react';

// Translation
import { useTranslation } from 'react-i18next';

// Component use
import { useResultSearchBar } from './useResultSearchBar';

// Components
import ItemResultSearchBar from './ItemResultSearchBar';

// CSS
import styles from './resultSearchBar.module.css';

// Type
import { City } from 'types';

interface ResultSearchBarProps {
    inputValue: string;
    isOpen: boolean;
}

const ResultSearchBar: React.FC<ResultSearchBarProps> = ({ inputValue, isOpen }) => {
    const { t } = useTranslation();
    const { results, loading, error, handleSelectCity } = useResultSearchBar(inputValue);

    const modalClass = isOpen ? styles.root : styles.rootUnactive;

    const renderContent = () => {
        if (error) {
            return <p className={styles.error}>{t("components-searchBar-resultSearchBar-error")}</p>;
        }
        if (results.length === 0) {
            return <p className={styles.noResult}>{t("components-searchBar-resultSearchBar-noResult")}</p>;
        }

        return (
            <ul className={styles.listContainer}>
                {results.map((item: City) => (
                    <li
                        key={`${item.country_code}-${item.name_city}`}
                        onMouseDown={() => handleSelectCity(item)}
                    >
                        <ItemResultSearchBar
                            countryCode={item.country_code}
                            countryName={item.name_country}
                            cityName={item.name_city}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    return <div className={modalClass}>{renderContent()}</div>;
};

export default ResultSearchBar;