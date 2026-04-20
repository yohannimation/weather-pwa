import React from 'react';

// Router
import { BrowserRouter } from "react-router-dom";

// Translation
import { useTranslation } from 'react-i18next';

// Contexts
import { ErrorProvider } from './contexts/ErrorContext';
import { UserProvider, useUser } from './contexts/UserContext';

// Components
import Router from './components/Router';
import CookieModal from './components/CookieModal';
import ErrorPopup from './components/ErrorPopup';
import Loading from './components/Loading';

const AppContent: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { isLoading } = useUser();

    return (
        <ErrorProvider>
            <BrowserRouter>
                <Loading isLoading={isLoading} />
                <ErrorPopup />
                <CookieModal />
                <Router />
            </BrowserRouter>
        </ErrorProvider>
    );
};

const App: React.FC = () => {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
};

export default App;
