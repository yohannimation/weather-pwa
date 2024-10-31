import React from 'react';

import { BrowserRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Router from './components/Router';
import CookieModal from './components/CookieModal';
import ErrorPopup from './components/ErrorPopup';

import DataContainer from './components/DataContainer';

const App = () => {
    const { t, i18n } = useTranslation();

    return (
        <BrowserRouter>
            <ErrorPopup />
            <CookieModal />
            {/* <Router /> */}
            <DataContainer
                title="Titre test from app.js"
                infoData={null}
                isHorizontal={true}
                weatherData={null}
            />
        </BrowserRouter>
    );
};

export default App;