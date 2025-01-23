import React, { useState, useEffect } from 'react';

import Icon from "../Icon";

import style from './select.module.css';

const Select = props => {
    const {
        selectedValue = null,
        data = [],
        returnedValue
    } = props;

    const [selectClass, setSelectClass] = useState(style.selectClosed);
    const [inputValueName, setInputValueName] = useState(selectedValue);

    const changeOpening = () => {
        if (selectClass === style.selectClosed) {
            setSelectClass(style.selectOpened);
        } else {
            setSelectClass(style.selectClosed);
        }
    }

    const countData = data.length;
    const list = data.map((item, index) => {
        var id, name;
        for (let key in item) {
            if (key.includes('id')) {
                id = item[key];
            }
            if (key.includes('name')) {
                name = item[key];
            }
        }
        return (
            <li
                key={id}
                className={style.item}
                onClick={() => {
                    setInputValueName(name);
                    returnedValue(name)
                    changeOpening();
                }}
            >
                {name}
            </li>
        )
    })

    return (
        <div className={style.root}>
            <div className={selectClass}>
                <div className={style.header} onClick={changeOpening}>
                    <p>{selectedValue ? inputValueName : 'No data selected'}</p>
                    <div className={style.icon}><Icon name='down' size='24' /></div>
                </div>
            </div>
            <ul className={style.list} style={{ "--i": countData,}}>
                {list}
            </ul>
        </div>
    )
}

export default Select;