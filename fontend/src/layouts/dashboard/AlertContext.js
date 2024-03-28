// AlertContext.js

import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alertContent, setAlertContent] = useState(null);

    const showAlert = (type, message) => {
        setAlertContent({ type, message });
    };

    const clearAlert = () => {
        setAlertContent(null);
    };

    return (
        <AlertContext.Provider value={{ alertContent, showAlert, clearAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
