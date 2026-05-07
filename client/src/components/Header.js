import React from 'react';
import { Menu, X, Zap, Home, ChevronRight, Sun, Moon } from 'lucide-react';
import { THEME } from '../constants/theme';

const Header = ({ toggleSidebar, isSidebarOpen, isDarkMode, setIsDarkMode }) => {
    const headerClasses = isDarkMode
        ? `${THEME.D_PRIMARY_GRADIENT} text-white`
        : `${THEME.L_PRIMARY_GRADIENT} text-white`;

    return (
        <header className={`${headerClasses} shadow-2xl z-40 relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute w-64 h-64 rounded-full -top-32 -right-32 bg-cyan-300/30 animate-pulse-slow"></div>
                <div className="absolute w-48 h-48 rounded-full bg-teal-300/30 top-10 -left-24 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative flex items-center justify-between h-12 max-w-full px-4 mx-auto sm:px-6 lg:px-8">
                {/* Left Section (Logo & Dashboard Title) */}
                <div className="flex items-center space-x-4">
                    <button
                        className="p-2 transition-all duration-300 rounded-md lg:hidden hover:bg-white/10 hover:scale-105 active:scale-95"
                        onClick={toggleSidebar}
                        aria-label="Toggle Sidebar"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Zap size={28} className="text-white fill-current animate-pulse" />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                        </div>
                        <span className="hidden text-2xl font-black tracking-wider sm:inline">ADRS<span className="font-light">Info</span></span>
                        <span className="items-center hidden h-6 pl-4 ml-4 text-sm font-semibold border-l border-white/50 md:flex">
                            <Home size={16} className="mr-2" /> Home
                            <ChevronRight size={16} className="mx-2 text-white/70" />
                            <span className="font-bold">Dashboard</span>
                        </span>
                    </div>
                </div>

                {/* Right Section (User Info & Actions) */}
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <button
                        className="p-2 transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-110 active:scale-95"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        aria-label="Toggle Dark Mode"
                    >
                        <div className="relative">
                            {isDarkMode ? <Sun size={20} className='text-yellow-300' /> : <Moon size={20} className='text-white' />}
                        </div>
                    </button>

                    {/* Enhanced User Admin Info */}
                    <div className="flex items-center space-x-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold leading-none">ASTADMIN</p>
                            <p className="text-xs font-light leading-none text-white/80">Epidemiologist, Lahore</p>
                        </div>
                        <div className="relative group">
                            <div className="flex items-center justify-center w-10 h-10 text-lg font-bold transition-all duration-300 bg-white border-2 border-white rounded-full shadow-lg cursor-pointer text-cyan-700 hover:scale-105 hover:shadow-xl">
                                A
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
