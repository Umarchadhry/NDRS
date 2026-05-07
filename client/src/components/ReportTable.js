import React, { useState } from 'react';
import { Download, Eye, FileText, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { THEME } from '../constants/theme';

const ReportTable = ({ isDarkMode }) => {
    const [activeTab, setActiveTab] = useState('IDR');

    const tabs = [
        { id: 'DIR', label: 'DIR', count: 12, icon: FileText },
        { id: 'IDR', label: 'IDR', count: 5, icon: Activity },
        { id: 'SCR', label: 'SCR', count: 8, icon: AlertCircle },
        { id: 'DRF', label: 'DRF', count: 3, icon: CheckCircle },
    ];

    // Mock Data
    const reportData = [
        { id: 'RPT-001', date: '2024-03-10', disease: 'FMD', species: 'Buffalo', status: 'Pending', total: 50, sick: 5, dead: 1, ringVac: 'Yes', district: 'Lahore', tehsil: 'City', mouza: 'Chung', farmer: 'Ali Khan' },
        { id: 'RPT-002', date: '2024-03-11', disease: 'LSD', species: 'Cow', status: 'Confirmed', total: 30, sick: 2, dead: 0, ringVac: 'No', district: 'Kasur', tehsil: 'Pattoki', mouza: 'Wan', farmer: 'Bilal Ahmed' },
        { id: 'RPT-003', date: '2024-03-12', disease: 'PPR', species: 'Goat', status: 'Resolved', total: 100, sick: 15, dead: 2, ringVac: 'Yes', district: 'Sheikhupura', tehsil: 'Muridke', mouza: 'Narang', farmer: 'Ch. Aslam' },
        { id: 'RPT-004', date: '2024-03-13', disease: 'FMD', species: 'Cow', status: 'Pending', total: 45, sick: 4, dead: 0, ringVac: 'Yes', district: 'Lahore', tehsil: 'Cantt', mouza: 'Bhatta', farmer: 'M. Riaz' },
        { id: 'RPT-005', date: '2024-03-14', disease: 'LSD', species: 'Buffalo', status: 'Confirmed', total: 20, sick: 3, dead: 1, ringVac: 'No', district: 'Okara', tehsil: 'Renala', mouza: 'Chuchak', farmer: 'Sajid Ali' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'Confirmed': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            case 'Resolved': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <div className={`w-full rounded-2xl overflow-hidden border backdrop-blur-xl transition-all duration-300 ${isDarkMode
                ? 'bg-[#1e1b4b]/80 border-indigo-500/20 shadow-lg shadow-indigo-500/10'
                : 'bg-white/90 border-indigo-50 shadow-xl'
            }`}>
            {/* Header & Tabs */}
            <div className="p-4 border-b border-indigo-500/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Tabs */}
                    <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const TabIcon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap
                                        ${isActive
                                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                                            : isDarkMode ? 'text-indigo-200 hover:bg-white/5' : 'text-slate-600 hover:bg-indigo-50'
                                        }
                                    `}
                                >
                                    <TabIcon size={16} className="mr-2" />
                                    {tab.label}
                                    <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20 text-white' : isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
                                        }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        <button className={`
                            flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                            ${isDarkMode ? 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}
                        `}>
                            <Eye size={16} className="mr-2" />
                            Show Details
                        </button>
                        <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                            <Download size={16} className="mr-2" />
                            Download Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className={`text-xs uppercase font-bold ${isDarkMode ? 'bg-indigo-950/50 text-indigo-200' : 'bg-indigo-50/50 text-indigo-700'
                        }`}>
                        <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Report ID</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Disease</th>
                            <th className="px-4 py-3">Species</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-center">Total</th>
                            <th className="px-4 py-3 text-center">Sick</th>
                            <th className="px-4 py-3 text-center">Dead</th>
                            <th className="px-4 py-3 text-center">Ring Vac</th>
                            <th className="px-4 py-3">District</th>
                            <th className="px-4 py-3">Tehsil</th>
                            <th className="px-4 py-3">Mouza</th>
                            <th className="px-4 py-3 rounded-tr-lg">Farmer</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-indigo-500/10' : 'divide-indigo-100'}`}>
                        {reportData.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`
                                    transition-colors duration-200
                                    ${isDarkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-indigo-50/30 text-slate-600'}
                                `}
                            >
                                <td className="px-4 py-3 font-medium text-indigo-500">{row.id}</td>
                                <td className="px-4 py-3">{row.date}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${row.disease === 'FMD' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300' :
                                            row.disease === 'LSD' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300' :
                                                'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300'
                                        }`}>
                                        {row.disease}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{row.species}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(row.status)}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center font-medium">{row.total}</td>
                                <td className="px-4 py-3 text-center text-amber-500">{row.sick}</td>
                                <td className="px-4 py-3 text-center text-rose-500">{row.dead}</td>
                                <td className="px-4 py-3 text-center">
                                    {row.ringVac === 'Yes'
                                        ? <CheckCircle size={16} className="mx-auto text-emerald-500" />
                                        : <span className="text-slate-400">-</span>
                                    }
                                </td>
                                <td className="px-4 py-3">{row.district}</td>
                                <td className="px-4 py-3">{row.tehsil}</td>
                                <td className="px-4 py-3">{row.mouza}</td>
                                <td className="px-4 py-3">{row.farmer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer */}
            <div className={`p-4 border-t text-xs flex justify-between items-center ${isDarkMode ? 'border-indigo-500/10 text-indigo-300' : 'border-indigo-100 text-slate-500'
                }`}>
                <span>Showing 5 of {tabs.find(t => t.id === activeTab).count} entries</span>
                <div className="flex space-x-2">
                    <button className={`px-3 py-1 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>Previous</button>
                    <button className={`px-3 py-1 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default ReportTable;
