import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { THEME, SHADOW_STYLE } from '../constants/theme';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CurrentLocation = ({ setPosition }) => {
    const map = useMap();

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition((pos) => {
            const coords = [pos.coords.latitude, pos.coords.longitude];
            setPosition(coords);
            map.setView(coords, 13);
        });
    }, [map, setPosition]);

    return null;
};

const MapComponent = ({ isDarkMode, height = "100%" }) => {
    const [position, setPosition] = useState([31.5204, 74.3587]);

    const cardBg = isDarkMode
        ? `${THEME.D_CARD_BG} text-white border-slate-700`
        : `${THEME.L_CARD_BG} text-gray-800 border-gray-200`;

    const headerBg = isDarkMode
        ? "bg-slate-700/50 text-white border-slate-700"
        : "bg-gray-100 text-gray-800 border-gray-200";

    const mapBg = isDarkMode ? "bg-slate-900" : "bg-slate-700";

    return (
        <div
            className={`p-0 border rounded-xl overflow-hidden ${SHADOW_STYLE} ${cardBg}`}
            style={{ height: height }}
        >
            {/* HEADER */}
            <div
                className={`p-2 text-base font-bold text-white bg-gradient-to-r from-cyan-700 to-teal-500 border-b flex items-center justify-between ${headerBg}`}
            >
                <div className="flex items-center">
                    <MapPin size={20} className={`mr-1 text-${THEME.ACCENT_COLOR}`} />
                    Disease Prevalence Map of Punjab
                </div>
                <ChevronDown
                    size={18}
                    className="text-gray-500 transition hover:text-cyan-500"
                />
            </div>

            {/* MAP SECTION */}
            <div className="p-1 h-[calc(100%-52px)]">
                <div className={`w-full h-full overflow-hidden rounded-lg ${mapBg}`}>
                    <MapContainer
                        center={position}
                        zoom={10}
                        scrollWheelZoom={true}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <CurrentLocation setPosition={setPosition} />

                        {/* Light or Dark Map Tiles */}
                        <TileLayer
                            url={
                                isDarkMode
                                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            }
                        />

                        <Marker position={position}>
                            <Popup>You are here</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
