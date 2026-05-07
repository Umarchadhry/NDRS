import React from 'react';
import { ChevronDown, FlaskConical } from 'lucide-react';
import { THEME, SHADOW_STYLE } from '../constants/theme';

const SVG_CHART_COLORS = {
    Exportation: '#16a3b3', // Teal
    Observation: '#f59e0b', // Amber
    Alerts: '#ef4444',      // Red
    Vets: '#3b82f6',        // Blue
    Public: '#10b981',      // Emerald
    Pending: '#ef4444',     // Red
    Completed: '#10b981',   // Green
    Buffalo: '#1e293b',     // Slate 800
    Cow: '#e11d48',         // Rose 600
    Goat: '#d97706',        // Amber 600
    Sheep: '#059669',       // Emerald 600
    FMD: '#7c3aed',         // Violet 600
    LSD: '#db2777',         // Pink 600
    PPR: '#2563eb'          // Blue 600
};

export const SvgBarChart = ({ title, height, icon: Icon, isDarkMode, data, keys, indexBy }) => {
    const chartHeight = parseInt(height) - 72;
    const chartWidth = 700;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const contentWidth = chartWidth - margin.left - margin.right;
    const contentHeight = chartHeight - margin.top - margin.bottom;

    const cardBg = isDarkMode
        ? `${THEME.D_CARD_BG} text-white border-slate-700`
        : `${THEME.L_CARD_BG} text-gray-800 border-gray-200`;
    const headerBg = isDarkMode
        ? 'bg-slate-700/50 text-white border-slate-700'
        : 'bg-gray-100 text-gray-800 border-gray-200';
    const axisColor = isDarkMode ? '#475569' : '#cbd5e1';
    const textColor = isDarkMode ? '#e2e8f0' : '#475569';

    // 1. Calculate max Y value
    const maxVal = Math.max(...data.flatMap(d => keys.map(k => d[k])));
    const scaleY = (value) => (value / maxVal) * contentHeight;
    const barWidth = contentWidth / (data.length * (keys.length + 1.5));

    // 2. Determine number of Y-axis ticks
    const yTicks = 5;
    const yTickInterval = maxVal / yTicks;

    return (
        <div
            className={`p-0 border rounded-xl overflow-hidden ${SHADOW_STYLE} ${cardBg}`}
            style={{ height: height }}
        >
            <div className={`p-3 text-base font-bold text-white bg-gradient-to-r from-cyan-700 to-teal-500 border-b flex items-center justify-between ${headerBg}`}>
                <div className="flex items-center">
                    <Icon size={20} className={`mr-3 text-${THEME.ACCENT_COLOR}`} />
                    {title}
                </div>
                <ChevronDown size={18} className="text-gray-500 transition hover:text-cyan-500" />
            </div>
            <div className="p-2 h-[calc(100%-52px)]">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        {/* Y-Axis Grid Lines and Labels */}
                        {Array.from({ length: yTicks + 1 }).map((_, i) => {
                            const y = contentHeight - (i * contentHeight) / yTicks;
                            const value = Math.round(i * yTickInterval).toLocaleString();
                            return (
                                <React.Fragment key={i}>
                                    <line x1="0" y1={y} x2={contentWidth} y2={y} stroke={axisColor} strokeDasharray="3 3" />
                                    <text x="-5" y={y + 3} fill={textColor} fontSize="10" textAnchor="end">{value}</text>
                                </React.Fragment>
                            );
                        })}

                        {/* Bars and X-Axis Labels */}
                        {data.map((d, dataIndex) => {
                            const groupX = (dataIndex / data.length) * contentWidth;
                            const groupSpacing = contentWidth / data.length;

                            return (
                                <g key={dataIndex} transform={`translate(${groupX}, 0)`}>
                                    {keys.map((key, keyIndex) => {
                                        const barHeight = scaleY(d[key]);
                                        const barX = (keyIndex * barWidth) + (groupSpacing / (keys.length + 1)) * 0.5;

                                        return (
                                            <React.Fragment key={key}>
                                                <rect
                                                    x={barX}
                                                    y={contentHeight - barHeight}
                                                    width={barWidth}
                                                    height={barHeight}
                                                    fill={SVG_CHART_COLORS[key]}
                                                    rx="2"
                                                    className="transition-all duration-300 hover:opacity-80"
                                                >
                                                    <title>{key}: {d[key].toLocaleString()}</title>
                                                </rect>
                                                <text
                                                    x={barX + barWidth / 2}
                                                    y={contentHeight - barHeight - 5}
                                                    textAnchor="middle"
                                                    fill={textColor}
                                                    fontSize="9"
                                                >
                                                    {d[key]}
                                                </text>
                                            </React.Fragment>
                                        );
                                    })}

                                    {/* X-Axis Label */}
                                    <text
                                        x={groupSpacing / 2}
                                        y={contentHeight + 20}
                                        fill={textColor}
                                        fontSize="10"
                                        textAnchor="middle"
                                    >
                                        {d[indexBy]}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Axis Lines (X and Y) */}
                        <line x1="0" y1="0" x2="0" y2={contentHeight} stroke={textColor} strokeWidth="1" />
                        <line x1="0" y1={contentHeight} x2={contentWidth} y2={contentHeight} stroke={textColor} strokeWidth="1" />
                    </g>
                </svg>

                {/* Legend */}
                <div className="flex justify-center mt-2 space-x-4 text-xs">
                    {keys.map(key => (
                        <div key={key} className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: SVG_CHART_COLORS[key] }}></span>
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{key}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const SvgHorizontalBarChart = ({ title, height, icon: Icon, isDarkMode, data, keys, indexBy }) => {
    const chartHeight = parseInt(height) - 72;
    const chartWidth = 700;
    const margin = { top: 20, right: 20, bottom: 40, left: 100 };
    const contentWidth = chartWidth - margin.left - margin.right;
    const contentHeight = chartHeight - margin.top - margin.bottom;

    const cardBg = isDarkMode
        ? `${THEME.D_CARD_BG} text-white border-slate-700`
        : `${THEME.L_CARD_BG} text-gray-800 border-gray-200`;
    const headerBg = isDarkMode
        ? 'bg-slate-700/50 text-white border-slate-700'
        : 'bg-gray-100 text-gray-800 border-gray-200';
    const axisColor = isDarkMode ? '#475569' : '#cbd5e1';
    const textColor = isDarkMode ? '#e2e8f0' : '#475569';

    // 1. Calculate max Value (for X axis now)
    const maxVal = Math.max(...data.flatMap(d => keys.map(k => d[k])));
    const scaleX = (value) => (value / maxVal) * contentWidth;
    const barHeight = contentHeight / (data.length * (keys.length + 1.5));

    // 2. Determine number of X-axis ticks
    const xTicks = 5;
    const xTickInterval = maxVal / xTicks;

    return (
        <div
            className={`p-0 border rounded-xl overflow-hidden ${SHADOW_STYLE} ${cardBg}`}
            style={{ height: height }}
        >
            <div className={`p-3 text-base font-bold text-white bg-gradient-to-r from-cyan-700 to-teal-500 border-b flex items-center justify-between ${headerBg}`}>
                <div className="flex items-center">
                    <Icon size={20} className={`mr-3 text-${THEME.ACCENT_COLOR}`} />
                    {title}
                </div>
                <ChevronDown size={18} className="text-gray-500 transition hover:text-cyan-500" />
            </div>
            <div className="p-2 h-[calc(100%-52px)]">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        {/* X-Axis Grid Lines and Labels */}
                        {Array.from({ length: xTicks + 1 }).map((_, i) => {
                            const x = (i * contentWidth) / xTicks;
                            const value = Math.round(i * xTickInterval).toLocaleString();
                            return (
                                <React.Fragment key={i}>
                                    <line x1={x} y1="0" x2={x} y2={contentHeight} stroke={axisColor} strokeDasharray="3 3" />
                                    <text x={x} y={contentHeight + 15} fill={textColor} fontSize="10" textAnchor="middle">{value}</text>
                                </React.Fragment>
                            );
                        })}

                        {/* Bars and Y-Axis Labels */}
                        {data.map((d, dataIndex) => {
                            const groupY = (dataIndex / data.length) * contentHeight;
                            const groupSpacing = contentHeight / data.length;

                            return (
                                <g key={dataIndex} transform={`translate(0, ${groupY})`}>
                                    {keys.map((key, keyIndex) => {
                                        const barW = scaleX(d[key]);
                                        const barY = (keyIndex * barHeight) + (groupSpacing / (keys.length + 1)) * 0.5;

                                        return (
                                            <React.Fragment key={key}>
                                                <rect
                                                    x="0"
                                                    y={barY}
                                                    width={barW}
                                                    height={barHeight}
                                                    fill={SVG_CHART_COLORS[key]}
                                                    rx="2"
                                                    className="transition-all duration-300 hover:opacity-80"
                                                >
                                                    <title>{key}: {d[key].toLocaleString()}</title>
                                                </rect>
                                                <text
                                                    x={barW + 5}
                                                    y={barY + barHeight / 2}
                                                    dominantBaseline="middle"
                                                    fill={textColor}
                                                    fontSize="9"
                                                >
                                                    {d[key]}
                                                </text>
                                            </React.Fragment>
                                        );
                                    })}

                                    {/* Y-Axis Label */}
                                    <text
                                        x="-10"
                                        y={groupSpacing / 2}
                                        fill={textColor}
                                        fontSize="10"
                                        textAnchor="end"
                                        dominantBaseline="middle"
                                    >
                                        {d[indexBy]}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Axis Lines (X and Y) */}
                        <line x1="0" y1="0" x2="0" y2={contentHeight} stroke={textColor} strokeWidth="1" />
                        <line x1="0" y1={contentHeight} x2={contentWidth} y2={contentHeight} stroke={textColor} strokeWidth="1" />
                    </g>
                </svg>

                {/* Legend */}
                <div className="flex justify-center mt-2 space-x-4 text-xs">
                    {keys.map(key => (
                        <div key={key} className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: SVG_CHART_COLORS[key] }}></span>
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{key}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
