import React, { useState, useEffect, useRef } from 'react';

// Component use
import { useUser } from 'contexts/UserContext';

// Leaflet
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Utils
import { formatTimestamp } from 'utils/dateUtils';

// CSS
import styles from './weatherRadar.module.css';

interface RainViewerFrame {
    time: number;
    path: string;
}

interface RainViewerData {
    radar: {
        past: RainViewerFrame[];
    };
    host: string;
}

const API_URL = 'https://api.rainviewer.com/public/weather-maps.json';
const ANIMATION_DELAY_MS = 600;

const WeatherRadar: React.FC = () => {
    const [frames, setFrames] = useState<RainViewerFrame[]>([]);
    const [host, setHost] = useState('');
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const { user } = useUser();

    useEffect(() => {
        const fetchRadarData = async () => {
            try {
                const response = await fetch(API_URL);
                const data: RainViewerData = await response.json();
                setHost(data.host);
                setFrames(data.radar.past);
                setCurrentFrameIndex(data.radar.past.length - 1);
            } catch (error) {
                console.error('Error fetching RainViewer data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRadarData();
    }, []);

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
            }, ANIMATION_DELAY_MS);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isPlaying, frames.length]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const nextFrame = () => {
        setIsPlaying(false);
        setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
    };
    const prevFrame = () => {
        setIsPlaying(false);
        setCurrentFrameIndex((prev) => (prev - 1 + frames.length) % frames.length);
    };

    if (isLoading) {
        return (
            <div className={styles.weatherRadarContainer}>
                <p>Loading Radar...</p>
            </div>
        );
    }

    const currentFrame = frames[currentFrameIndex];
    const radarTileUrl = `${host}${currentFrame?.path}/${window.devicePixelRatio >= 2 ? 512 : 256}/{z}/{x}/{y}/2/1_1.png`;

    return (
        <div className={styles.weatherRadarContainer}>
            <MapContainer
                center={[
                    Number(user.cityLatitude),
                    Number(user.cityLongitude)
                ]}
                zoom={15}
                className={styles.map}
                maxZoom={12}
            >
                <TileLayer
                    attribution='&copy; <a href="https://cartodb.com/about/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {currentFrame && (
                    <TileLayer
                        url={radarTileUrl}
                        opacity={.7}
                        maxNativeZoom={7}
                    />
                )}
                <CircleMarker
                    center={[Number(user.cityLatitude), Number(user.cityLongitude)]}
                    radius={5}
                    color="var(--dark-color)"
                    fillColor="var(--day-first-color)"
                    fillOpacity={1}
                />
            </MapContainer>

            <div className={styles.controls}>
                <span className={styles.timestamp}>
                    {currentFrame ? formatTimestamp(currentFrame.time) : '...'}
                </span>
                <div className={styles.buttonGroup}>
                    <button className={styles.controlBtn} onClick={prevFrame} title="Previous">‹</button>
                    <button className={styles.controlBtn} onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button className={styles.controlBtn} onClick={nextFrame} title="Next">›</button>
                </div>
            </div>
        </div>
    );
};

export default WeatherRadar;
