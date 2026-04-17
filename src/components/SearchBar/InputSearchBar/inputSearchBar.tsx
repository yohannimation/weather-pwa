import React, { useState } from 'react';

// Setter - Getter
import { getCityName } from '../../LocalStorage/useGetter';

// Components
import ResultSearchBar from '../ResultSearchBar';
import Icon from '../../Icon';

// CSS
import styles from './inputSearchBar.module.css';

const InputSearchBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState(getCityName() ?? "");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.inputContainer}>
                <div className={styles.icon}>
                    <Icon size={30} name={'search'} />
                </div>
                <input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={() => setModalIsOpen(true)}
                    onBlur={() => setModalIsOpen(false)}
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

export default InputSearchBar;
