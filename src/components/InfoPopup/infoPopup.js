import React, { useState } from 'react';

import Popup from '../Popup';

import styles from './infoPopup.module.css'

const InfoPopup = props => {
    const {
        title,
        content,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const infoPopupTrigger = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    return (
        <div onClick={infoPopupTrigger}>
            <img src='/logo192.png' alt=''/>
            <Popup
                active={isOpen}
                title={title}
                message={content}
                buttonText="Close"
                action={infoPopupTrigger}
            />
        </div>
    );
}

export default InfoPopup;
