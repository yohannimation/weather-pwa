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

    const graphHeight = 25;
    const pointWidth = 100;
    const verticalCenter = 170;

    const getColor = (temp: number) => {
        const coldThreshold = 17;
        const hotThreshold = 27;
        const transitionRange = 6; // Smooth transition over 6 degrees

        const cold = { r: 52, g: 152, b: 219 }; // Blue #3498db
        const mid = { r: 255, g: 255, b: 255 };  // White #ffffff
        const hot = { r: 230, g: 126, b: 34 };  // Red #e67e22

        let r, g, b;

        if (temp < coldThreshold - transitionRange / 2) {
            // Pure Blue
            r = cold.r; g = cold.g; b = cold.b;
        } else if (temp < coldThreshold + transitionRange / 2) {
            // Transition Blue -> White
            const t = (temp - (coldThreshold - transitionRange / 2)) / transitionRange;
            r = cold.r + (mid.r - cold.r) * t;
            g = cold.g + (mid.g - cold.g) * t;
            b = cold.b + (mid.b - cold.b) * t;
        } else if (temp < hotThreshold - transitionRange / 2) {
            // Pure White
            r = mid.r; g = mid.g; b = mid.b;
        } else if (temp < hotThreshold + transitionRange / 2) {
            // Transition White -> Red
            const t = (temp - (hotThreshold - transitionRange / 2)) / transitionRange;
            r = mid.r + (hot.r - mid.r) * t;
            g = mid.g + (hot.g - mid.g) * t;
            b = mid.b + (hot.b - mid.b) * t;
        } else {
            // Pure Red
            r = hot.r; g = hot.g; b = hot.b;
        }

        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };

    const points = temperatures.map((temp, i) => {
        const x = (i * pointWidth) + (pointWidth / 2);
        const y = verticalCenter + (graphHeight / 2) - ((temp - minTemp) / range) * graphHeight;
        return { x, y, temp };
    });

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
            {points.slice(0, -1).map((p, i) => {
                const nextP = points[i + 1];
                const avgTemp = (p.temp + nextP.temp) / 2;
                return (
                    <line
                        key={`line-${i}`}
                        x1={p.x}
                        y1={p.y}
                        x2={nextP.x}
                        y2={nextP.y}
                        stroke={getColor(avgTemp)}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeOpacity="0.8"
                    />
                );
            })}
            {points.map((p, i) => (
                <circle
                    key={`circle-${i}`}
                    cx={p.x}
                    cy={p.y}
                    r="5"
                    fill={getColor(p.temp)}
                    strokeOpacity="0.6"
                />
            ))}
        </svg>
    );
};

export default TemperatureGraph;
