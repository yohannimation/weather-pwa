import React from 'react';

function Weather() {
    const nom = localStorage.getItem('cityName');
    const latitude = localStorage.getItem('cityLatitude');
    const longitude = localStorage.getItem('cityLongitude');

    return (
        <div>
            weather<br/>
            {nom}<br/>
            {latitude}<br/>
            {longitude}<br/>
        </div>
    );
}

export default Weather;
