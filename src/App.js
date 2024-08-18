import React from 'react';

import { BrowserRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Router from './components/Router';
import CookieModal from './components/CookieModal';

const App = () => {
    const { t, i18n } = useTranslation();

    return (
        <BrowserRouter>
            <Router />
            <CookieModal />
        </BrowserRouter>
    );
};

export default App;