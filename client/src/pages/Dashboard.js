import React from 'react';
import { FlaskConical, AlertTriangle, Check, Users, HeartPulse, TrendingUp, BarChart3, ListChecks } from 'lucide-react';
import { THEME } from '../constants/theme';
import StatCard from '../components/StatCard';
import FilterPanel from '../components/FilterPanel';
import MapComponent from '../components/MapComponent';
import { SvgBarChart, SvgHorizontalBarChart } from '../components/Charts';
import ReportTable from '../components/ReportTable';

const Dashboard = ({ isDarkMode }) => {
    // Stats data updated with trends
    const statsData = [
        { value: '1,452', label: 'Samples Collected', icon: FlaskConical, trend: 12.5 },
        { value: '3', label: 'Suspected Outbreaks', icon: AlertTriangle, trend: -5.1 },
        { value: '25', label: 'Confirmed Cases', icon: Check, trend: 7.8 },
        { value: '3,800', label: 'Sick Animals', icon: Users, trend: 2.1 },
        { value: '185', label: 'Total Deaths', icon: HeartPulse, trend: -15.0 },
        { value: '9,200', label: 'Ring Vaccinations', icon: TrendingUp, trend: 35.2 },
    ];

    // Chart Mock Data
    const speciesData = [
        { month: 'Jan', Buffalo: 4000, Cow: 2400, Goat: 1000, Sheep: 500 },
        { month: 'Feb', Buffalo: 3000, Cow: 1398, Goat: 2000, Sheep: 100 },
        { month: 'Mar', Buffalo: 2000, Cow: 980, Goat: 1500, Sheep: 200 },
        { month: 'Apr', Buffalo: 2780, Cow: 3908, Goat: 1200, Sheep: 300 },
        { month: 'May', Buffalo: 1890, Cow: 4800, Goat: 1800, Sheep: 400 },
    ];

    const diseaseData = [
        { month: 'Jan', FMD: 150, LSD: 30, PPR: 20 },
        { month: 'Feb', FMD: 200, LSD: 45, PPR: 30 },
        { month: 'Mar', FMD: 180, LSD: 60, PPR: 40 },
        { month: 'Apr', FMD: 250, LSD: 75, PPR: 50 },
        { month: 'May', FMD: 300, LSD: 90, PPR: 60 },
    ];

    const labStatusData = [
        { name: 'VDIL LHR', Pending: 55, Completed: 120 },
        { name: 'VDIL MTN', Pending: 30, Completed: 85 },
        { name: 'VDIL RWP', Pending: 15, Completed: 150 },
        { name: 'VDIL BHW', Pending: 45, Completed: 90 },
    ];

    const titleBarClasses = isDarkMode
        ? `text-white ${THEME.D_PRIMARY_GRADIENT} shadow-cyan-500/50`
        : `text-white ${THEME.L_PRIMARY_GRADIENT} shadow-cyan-500/30`;


    return (
        <div className="p-1 custom-scrollbar-light h-full">
            <div className="grid grid-cols-1 gap-2 xl:grid-cols-12">
                <div className="space-y-1 xl:col-span-2">
                    <FilterPanel isDarkMode={isDarkMode} />
                </div>

                <div className="space-y-2 xl:col-span-10">

                    <div className="grid h-auto grid-cols-1 gap-4 lg:grid-cols-12">

                        <div className="space-y-2 lg:col-span-7">
                            <div className={`p-1 text-xl text-center font-bold rounded-xl  ${titleBarClasses}`}>
                                Animal Disease Reporting Dashboard
                                <p>Provincial Summary</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                {statsData.map((stat, index) => <StatCard key={`stat-${index}`} {...stat} isDarkMode={isDarkMode} trend={stat.trend} />)}
                            </div>
                        </div>

                        <div className="lg:col-span-5 h-[340px]">
                            <MapComponent isDarkMode={isDarkMode} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-1">
                        <SvgBarChart
                            title="Species wise number of Sick & Dead animals"
                            height="370px"
                            icon={BarChart3}
                            isDarkMode={isDarkMode}
                            data={speciesData}
                            keys={['Buffalo', 'Cow', 'Goat', 'Sheep']}
                            indexBy="month"
                        />

                        <div className="space-y-4 lg:col-span-2">
                            <SvgBarChart
                                title="Disease Reports By Time Series"
                                height="360px"
                                icon={ListChecks}
                                isDarkMode={isDarkMode}
                                data={diseaseData}
                                keys={['FMD', 'LSD', 'PPR']}
                                indexBy="month"
                            />
                        </div>

                        <div className="space-y-4 lg:col-span-2">
                            <SvgHorizontalBarChart
                                title="Lab Status: Reports Summary"
                                height="360px"
                                icon={FlaskConical}
                                isDarkMode={isDarkMode}
                                data={labStatusData}
                                keys={['Pending', 'Completed']}
                                indexBy="name"
                            />
                        </div>
                    </div>

                </div>

                {/* Report Table Section */}
                <div className="mt-0 xl:col-span-12">
                    <ReportTable isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
