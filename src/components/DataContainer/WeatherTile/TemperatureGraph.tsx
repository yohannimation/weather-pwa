import React from 'react';
import { HourlyWeather } from 'types';

interface TemperatureGraphProps {
    data: HourlyWeather[];
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ data }) => {
    if (!data || data.length < 2) return null;

    const parseTemp = (tempStr: string) => {
        const cleaned = tempStr.replace(/[^0-9.-]/g, '');
        return parseFloat(cleaned) || 0;
    };

    const temperatures = data.map(d => parseTemp(d.temperature.value));
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);
    const range = maxTemp - minTemp || 1;

    const graphHeight = 80;
    const pointWidth = 100;
    const verticalCenter = 100; // Container height is 200px

    const points = temperatures.map((temp, i) => {
        const x = (i * pointWidth) + (pointWidth / 2);
        const y = verticalCenter + (graphHeight / 2) - ((temp - minTemp) / range) * graphHeight;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg
            className="temperature-graph-svg"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${data.length * pointWidth}px`,
                height: '200px',
                pointerEvents: 'none',
                zIndex: 0
            }}
        >
            <polyline
                fill="none"
                stroke="var(--light-color)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeOpacity="0.4"
                points={points}
            />
            {data.map((_, i) => {
                const x = (i * pointWidth) + (pointWidth / 2);
                const y = verticalCenter + (graphHeight / 2) - ((temperatures[i] - minTemp) / range) * graphHeight;
                return (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="var(--light-color)"
                        strokeOpacity="0.6"
                    />
                );
            })}
        </svg>
    );
};

export default TemperatureGraph;
