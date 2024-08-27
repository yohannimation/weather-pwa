import React from 'react';

import { BrowserRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Router from './components/Router';
import CookieModal from './components/CookieModal';

const App = () => {
    const { t, i18n } = useTranslation();

    return (
        <BrowserRouter>
            {/*<ErrorModal /> TODO create a component with a timer who check every 2sec if a cookie "error" is set if true, it will read the cookie "errorMsg" and display it*/}
            <Router />
            <CookieModal />
        </BrowserRouter>
    );
};

export default App;