import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ErrorState {
    active: boolean;
    title: string;
    message: string;
}

interface ErrorContextType {
    error: ErrorState;
    triggerError: (title: string, message: string) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setErrorState] = useState<ErrorState>({
        active: false,
        title: '',
        message: '',
    });

    const triggerError = (title: string, message: string) => {
        setErrorState({
            active: true,
            title,
            message,
        });
    };

    const clearError = () => {
        setErrorState({
            active: false,
            title: '',
            message: '',
        });
    };

    useEffect(() => {
        const handleExternalError = (event: any) => {
            const { title, message } = event.detail;
            triggerError(title, message);
        };

        window.addEventListener('app-error', handleExternalError);
        return () => window.removeEventListener('app-error', handleExternalError);
    }, []);

    return (
        <ErrorContext.Provider value={{ error, triggerError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};
