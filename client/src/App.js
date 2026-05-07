import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, BarChart3, FlaskConical, Briefcase, Settings, ClipboardList
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import { THEME } from './constants/theme';

const navItems = [
  { name: 'Dashboards', icon: LayoutDashboard, notifications: 3, path: '/' },
  { name: 'Map View', icon: FlaskConical, notifications: 0, path: '/map' }, // Added Map View
  { name: 'MIS Reports', icon: BarChart3, notifications: 0, path: '/reports' },
  { name: 'Monthly Lab Performance', icon: FlaskConical, notifications: 12, path: '/performance' },
  { name: 'Office Management', icon: Briefcase, notifications: 0, path: '/office' },
  { name: 'System Management', icon: Settings, notifications: 1, path: '/system' },
  { name: 'Report Tracker', icon: ClipboardList, notifications: 7, path: '/tracker' },
];

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);

  const bodyBg = isDarkMode ? THEME.D_BODY_BG : THEME.L_BODY_BG;
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';

  if (!mounted) return null;

  return (
    <Router>
      <div className={`h-screen overflow-hidden flex flex-col ${bodyBg} ${textColor} ${isDarkMode ? 'dark' : ''}`}>

        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <div className="flex flex-1 overflow-hidden">

          <Sidebar
            navItems={navItems}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            isDarkMode={isDarkMode}
          />

          <main className="flex-1 overflow-y-auto relative">
            <Routes>
              <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
              <Route path="/map" element={<MapPage isDarkMode={isDarkMode} />} />
              {/* Placeholders for other routes */}
              <Route path="*" element={<div className="p-10 text-center">Page Under Construction</div>} />
            </Routes>
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 transition-opacity duration-300 bg-black bg-opacity-70 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </Router>
  );
};

export default App;

// Inject custom CSS for scrollbar and animation
const styles = `
/* Custom Scrollbar for modern look */
.custom-scrollbar-light::-webkit-scrollbar {
    width: 8px;
}
.custom-scrollbar-light::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}
.custom-scrollbar-light::-webkit-scrollbar-thumb {
    background: #cbd5e1; /* Slate-300 */
    border-radius: 10px;
}
.custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
    background: #94a3b8; /* Slate-400 */
}

/* Dark Mode Scrollbar */
.dark .custom-scrollbar-light::-webkit-scrollbar-track {
    background: #1e293b; /* Slate-800 */
}
.dark .custom-scrollbar-light::-webkit-scrollbar-thumb {
    background: #475569; /* Slate-600 */
}
.dark .custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
    background: #64748b; /* Slate-500 */
}

/* Base animation for pulsing elements */
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
.animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);