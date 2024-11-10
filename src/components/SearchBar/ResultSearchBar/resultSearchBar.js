import React, { useState, useEffect } from 'react';

// Component use
import { requester, saveSearch } from './useResultSearchBar';

// Components
import ItemResultSearchBar from '../ItemResultSearchBar';

// CSS
import styles from './resultSearchBar.module.css';

const ResultSearchBar = props => {
    const {
        inputValue,
        isOpen
    } = props;

    const [isSearching, setIsSearching] = useState(false);
    const [requestedResultList, setRequestedResultList] = useState([]);
    const [modalClass, setModalClass] = useState(styles.rootUnactive);

    // Set different state when the search value change
    useEffect(() => {
        setIsSearching(true);

        requester(inputValue)
            .then((citiesData) => {
                setRequestedResultList(citiesData);
            });
        
            setIsSearching(false);
    }, [inputValue])

    useEffect(() => {
        if (isOpen) {
            setModalClass(styles.root);
        } else {
            setModalClass(styles.rootUnactive);
        }
    }, [isOpen])

    // Display the list of items or "nothing found"
    var htmlResultsList;
    if (requestedResultList) {
        htmlResultsList = requestedResultList.map((item) => {
            return (
                // Use "onMouseDown" because "onClick" is not enough fast. The result modal close before the value is selected
                <li key={item.id} onMouseDown={() => {
                    saveSearch(
                        {
                            "name_city": item.name_city,
                            "country_code": item.country_code,
                            "timezone": item.timezone,
                            "longitude": item.longitude,
                            "latitude": item.latitude
                        }
                    );
                }}
                >
                    <ItemResultSearchBar 
                        countryCode={item.country_code}
                        countryName={item.name_country}
                        cityName={item.name_city}
                    />
                </li>
            );
        })
    } else {
        htmlResultsList = <p className={styles.noResult}>
            Aucun résultat n'a été trouvé
        </p>
    }

    return (
        <div className={modalClass}>
            {isSearching ?
                    <div className={styles.loaderContainer}>loader</div>
            :
                    <ul className={styles.listContainer}>
                        {htmlResultsList}
                    </ul>
            }
        </div>
    );
}

export default ResultSearchBar;
