import React, { useState } from 'react';

// Components
import ResultSearchBar from '../ResultSearchBar';

// CSS
import styles from './inputSearchBar.module.css';

const ItemResultSearchBar = props => {
    const {
        initialSearchValue
    } = props;

    const [searchValue, setSearchValue] = useState(initialSearchValue ?? "");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.inputContainer}>
                <img className={styles.icon} src="/logo512.png" alt='' />
                <input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={e => setModalIsOpen(true)}
                    onBlur={e => setModalIsOpen(false)}
                    className={styles.input}
                />
            </div>
            <div className={styles.resultSearchBarContainer}>
                <ResultSearchBar
                    inputValue={searchValue}
                    isOpen={modalIsOpen}
                />
            </div>
        </div>
    );
}

export default ItemResultSearchBar;
