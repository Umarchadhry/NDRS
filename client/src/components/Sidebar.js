import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { THEME } from '../constants/theme';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ navItems, isSidebarOpen, toggleSidebar, isDarkMode }) => {
    const sidebarClasses = isDarkMode ? THEME.D_DARK_COLOR : THEME.L_DARK_COLOR;
    const activeBg = isDarkMode ? THEME.D_ACTIVE_BG : THEME.L_ACTIVE_BG;
    const hoverBg = isDarkMode ? 'hover:bg-slate-700/70' : 'hover:bg-slate-700/70';
    const textBase = isDarkMode ? 'text-slate-300' : 'text-slate-200';
    const location = useLocation();

    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 ${sidebarClasses} text-white z-40 
                transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:relative lg:translate-x-0 transition-transform duration-500 ease-in-out 
                lg:flex flex-col flex-shrink-0 shadow-2xl h-full`}
        >
            <div className="flex justify-end p-4 lg:hidden">
                <button onClick={toggleSidebar} className="p-2 transition-all duration-300 rounded-md hover:bg-white/10 hover:scale-105">
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 px-2 py-2 space-y-2 overflow-y-auto custom-scrollbar-light">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/');

                    return (
                        <Link
                            key={item.name}
                            to={item.path || '#'}
                            className={`relative flex items-center justify-between p-2 rounded-xl transition-all duration-300 group
                            ${isActive
                                    ? `${activeBg} shadow-lg font-semibold text-white transform scale-[1.02]`
                                    : `${hoverBg} hover:shadow-inner font-light ${textBase} hover:translate-x-1`}`
                            }
                        >
                            <div className="flex items-center">
                                <item.icon size={20} className="mr-3 " />
                                <span>{item.name}</span>
                            </div>

                            {/* Notification badges */}
                            {item.notifications > 0 && (
                                <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                                    {item.notifications}
                                </span>
                            )}

                            <ChevronRight
                                size={16}
                                className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'}`}
                            />

                            {/* Active indicator bar */}
                            {isActive && (
                                <div className="absolute left-0 w-1 h-8 transform -translate-y-1/2 bg-white rounded-r-full top-1/2"></div>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Sidebar footer */}
            <div className="p-4 mt-auto border-t border-slate-700">
                <div className="flex items-center transition-all duration-300 rounded-lg hover:bg-slate-700/50">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 text-sm font-bold text-white bg-teal-500 rounded-full">
                        A
                    </div>
                    <div>
                        <p className="text-sm font-medium">System Status</p>
                        <div className="flex items-center text-xs text-green-400">
                            <div className="w-2 h-2 mr-1 bg-green-400 rounded-full animate-pulse"></div>
                            All Systems Operational
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
