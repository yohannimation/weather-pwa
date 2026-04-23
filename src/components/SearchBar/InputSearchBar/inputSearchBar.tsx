import React, { useState } from 'react';

// User Context
import { useUser } from '../../../contexts/UserContext';
import { useInputSearchBar } from './useInputSearchBar';

// Components
import ResultSearchBar from './ResultSearchBar';
import Icon from '../../Icon';

// CSS
import styles from './inputSearchBar.module.css';

const InputSearchBar: React.FC = () => {
    const { locateMe } = useInputSearchBar();
    const { user } = useUser();

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(user.cityName ?? "");

    const focusInputTrigger = () => {
        inputRef.current?.focus();
    }

    const locateMeTrigger = async () => {
        await locateMe()
    };

    return (
        <div className={styles.root}>
            <div className={styles.inputContainer}>
                <div className={styles.icon} onClick={focusInputTrigger}>
                    <Icon size={30} name={'search'} />
                </div>
                <input
                    ref={inputRef}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={() => setModalIsOpen(true)}
                    onBlur={() => setModalIsOpen(false)}
                    className={styles.input}
                />
                <div className={styles.icon} onClick={locateMeTrigger}>
                    <Icon size={30} name={'location'} />
                </div>
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
