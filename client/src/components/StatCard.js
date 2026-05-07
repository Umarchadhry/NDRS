import React from 'react';
import { TrendingUp } from 'lucide-react';
import { SHADOW_STYLE } from '../constants/theme';

const StatCard = ({ value, label, icon: Icon, trend, isDarkMode }) => {
    const cardBg = isDarkMode
        ? 'bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white border-slate-700'
        : 'bg-gradient-to-br from-white to-blue-50 hover:from-white hover:to-blue-100 text-gray-800 border-gray-200';
    const accentText = trend > 0 ? 'text-green-500' : (trend < 0 ? 'text-red-500' : 'text-cyan-500');

    return (
        <div
            className={`relative p-4 rounded-xl shadow-lg border flex flex-col min-h-[120px] ${cardBg}
                transition-all duration-500 cursor-pointer transform hover:-translate-y-1 ${SHADOW_STYLE}`}
        >
            {/* Icon with background */}
            <div className="flex items-center justify-center w-full h-10 gap-5 mb-1 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
                {Icon && <Icon size={20} />}
                {/* Trend indicator */}
                {trend !== undefined && (
                    <div className={`flex items-center text-xs font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trend > 0 ? <TrendingUp size={14} className='mr-1' /> : trend < 0 ? <TrendingUp size={14} className='mr-1 transform rotate-180' /> : ''}
                        {trend !== 0 && `${trend > 0 ? '+' : ''}${trend}%`}
                    </div>
                )}
            </div>
            <div className={`text-3xl mb-1 font-extrabold text-center ${accentText} leading-none`}>
                {value}
            </div>


            <p className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">{label}</p>

            {/* Animated bottom border */}
            <div className="absolute bottom-0 left-0 w-full h-1 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-cyan-500 to-teal-500 group-hover:opacity-100"></div>
        </div>
    );
};

export default StatCard;
