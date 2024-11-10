import React from 'react';

// Router
import { BrowserRouter } from "react-router-dom";

// Translation
import { useTranslation } from 'react-i18next';

// Components
import Router from './components/Router';
import CookieModal from './components/CookieModal';
import ErrorPopup from './components/ErrorPopup';

const App = () => {
    const { t, i18n } = useTranslation();

    return (
        <BrowserRouter>
            <ErrorPopup />
            <CookieModal />
            <Router />
        </BrowserRouter>
    );
};

export default App;