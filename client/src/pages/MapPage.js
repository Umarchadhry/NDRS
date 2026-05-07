import React from 'react';
import MapComponent from '../components/MapComponent';

const MapPage = ({ isDarkMode }) => {
    return (
        <div className="h-full w-full p-4">
            <MapComponent isDarkMode={isDarkMode} height="100%" />
        </div>
    );
};

export default MapPage;
