import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Locate from '../../pages/Locate';
import UnknownPage from '../../pages/UnknownPage';
import Weather from '../../pages/Weather';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/locate" element={<Locate />} />
            <Route path="*" element={<UnknownPage />} />
        </Routes>
    );
}

export default Router;
