import React from 'react';

// Router
import { BrowserRouter } from "react-router-dom";

// Translation
import { useTranslation } from 'react-i18next';

// Contexts
import { ErrorProvider } from './contexts/ErrorContext';
import { UserProvider } from './contexts/UserContext';

// Components
import Router from './components/Router';
import CookieModal from './components/CookieModal';
import ErrorPopup from './components/ErrorPopup';

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <UserProvider>
            <ErrorProvider>
                <BrowserRouter>
                    <ErrorPopup />
                    <CookieModal />
                    <Router />
                </BrowserRouter>
            </ErrorProvider>
        </UserProvider>
    );
};

export default App;
