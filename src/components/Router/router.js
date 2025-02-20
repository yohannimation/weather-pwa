import React from 'react';

// Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Locate from '../../pages/Locate';
import Weather from '../../pages/Weather';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/locate" element={<Locate />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default Router;
