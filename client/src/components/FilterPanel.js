import React from 'react';
import { Calendar, Users, HeartPulse, FlaskConical } from 'lucide-react';
import { THEME, SHADOW_STYLE } from '../constants/theme';

const FilterBox = ({ title, children, Icon, isDarkMode }) => {
    const boxClasses = isDarkMode
        ? `${THEME.D_CARD_BG} text-white border-slate-700`
        : `${THEME.L_CARD_BG} text-gray-800 border-gray-200`;
    const headerClasses = isDarkMode
        ? `${THEME.D_PRIMARY_NAVY} text-white border-slate-700`
        : `${THEME.L_PRIMARY_NAVY} text-white border-slate-700`;

    return (
        <div className={`p-0 mb-2 border rounded-xl overflow-hidden ${SHADOW_STYLE} ${boxClasses}`}>
            <div className={`p-2 text-sm font-bold border-b flex items-center ${headerClasses}`}>
                <Icon size={18} className={`mr-3 text-${THEME.ACCENT_COLOR}`} />
                {title}
            </div>
            <div className="p-1 text-sm text-gray-700 dark:text-gray-300 max-h-[140px] overflow-y-auto custom-scrollbar-light">
                {children}
            </div>
        </div>
    );
};

const FilterBox2 = ({ title, children, Icon, isDarkMode }) => {
    const boxClasses = isDarkMode
        ? `${THEME.D_CARD_BG} text-white border-slate-700`
        : `${THEME.L_CARD_BG} text-gray-800 border-gray-200`;
    const headerClasses = isDarkMode
        ? `${THEME.D_PRIMARY_NAVY} text-white border-slate-700`
        : `${THEME.L_PRIMARY_NAVY} text-white border-slate-700`;

    return (
        <div className={`p-0 mb-2 border rounded-xl overflow-hidden ${SHADOW_STYLE} ${boxClasses}`}>
            <div className={`p-2 text-sm font-bold border-b flex items-center ${headerClasses}`}>
                <Icon size={18} className={`mr-3 text-${THEME.ACCENT_COLOR}`} />
                {title}
            </div>
            <div className="p-1 text-sm text-gray-700 dark:text-gray-300 max-h-[325px] overflow-y-auto custom-scrollbar-light">
                {children}
            </div>
        </div>
    );
};

const CheckboxItem = ({ label, isHeader = false, defaultChecked = false, isDarkMode }) => {
    const labelColor = isDarkMode
        ? (isHeader ? 'text-slate-200' : 'text-gray-300')
        : (isHeader ? 'font-bold text-slate-800' : 'text-gray-700');
    const hoverBg = isDarkMode ? 'hover:bg-cyan-900/50' : 'hover:bg-cyan-50/50';

    return (
        <div className={`flex items-center px-2 py-1.5 ${hoverBg} rounded-lg transition-colors cursor-pointer`}>
            <input
                type="checkbox"
                id={label.replace(/\s/g, '_')}
                defaultChecked={isHeader || defaultChecked}
                className={`w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 ${isDarkMode ? 'bg-slate-700 border-slate-600' : ''}`}
            />
            <label htmlFor={label.replace(/\s/g, '_')} className={`ml-3 text-sm ${labelColor}`}>
                {label}
            </label>
        </div>
    );
};

const FilterPanel = ({ isDarkMode }) => {
    const filters = {
        species: [
            { label: 'Select All', header: true, defaultChecked: true },
            { label: 'Large Animals', defaultChecked: true },
            { label: 'Small Animals', defaultChecked: true },
            'Camel', 'Equine', 'Poultry', 'Wildlife'
        ].map(item => typeof item === 'string' ? { label: item } : item),
        pageOfAnimals: ['Anthrax', 'Brucellosis', 'Foot and Mouth Disease (FMD)', 'Bovine Tuberculosis (bTB)', 'Rabies', 'Theileriosis', 'Scrapie', 'Strangles', 'Babesiosis', 'Young', 'Adult', 'Old', 'Contact with animals', 'Movement spread', 'Fodder/feed issue', 'Vaccination'],
        labs: ['Unknown', 'Introduction of new live animals', 'Movement of animals', 'Animals in transit', 'Contact with infected animal(s) at grazing/watering points', 'Fomites (Human, Vehicles, Feed, etc.)', 'Airborne spread', 'Vectors (Ticks, Flees, Flies, Mites, etc.)', 'Contact with wild species', 'Other'],
        district: ["Attock",
            "Bahawalnagar",
            "Bahawalpur",
            "Bhakkar",
            "Chakwal",
            "Chiniot",
            "Dera Ghazi Khan",
            "Faisalabad",
            "Gujranwala",
            "Gujrat",
            "Hafizabad",
            "Jhang",
            "Jhelum",
            "Kasur",
            "Khanewal",
            "Khushab",
            "Lahore",
            "Layyah",
            "Lodhran",
            "Mandi Bahauddin",
            "Mianwali",
            "Multan",
            "Muzaffargarh",
            "Nankana Sahib",
            "Narowal",
            "Okara",
            "Pakpattan",
            "Rahim Yar Khan",
            "Rajanpur",
            "Rawalpindi",
            "Sahiwal",
            "Sargodha",
            "Sheikhupura",
            "Sialkot",
            "Toba Tek Singh",
            "Vehari"],
    };

    const inputClasses = `p-1.5 text-sm transition border rounded-lg focus:ring-cyan-500 focus:border-cyan-500 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 text-gray-800'}`;
    const labelClasses = `text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;

    return (
        <div className="h-full space-y-2">
            <FilterBox title=" Period" Icon={Calendar} isDarkMode={isDarkMode}>
                <div className="flex flex-col space-y-1">
                    <label className={labelClasses}>FROM DATE</label>
                    <input type="date" defaultValue="2024-01-11" className={inputClasses} />
                    <label className={labelClasses}>TO DATE</label>
                    <input type="date" defaultValue="2024-05-11" className={inputClasses} />
                </div>
            </FilterBox>

            <FilterBox title="Species" Icon={Users} isDarkMode={isDarkMode}>
                {filters.species.map((item, index) => <CheckboxItem key={index} label={item.label} isHeader={item.header} defaultChecked={item.defaultChecked} isDarkMode={isDarkMode} />)}
            </FilterBox>

            <FilterBox2 title="Notifiable Diseases" Icon={HeartPulse} isDarkMode={isDarkMode}>
                {filters.pageOfAnimals.map((label, index) => <CheckboxItem key={index} label={label} isDarkMode={isDarkMode} />)}
            </FilterBox2>

            <FilterBox2 title="Origin of Infection" Icon={FlaskConical} isDarkMode={isDarkMode}>
                {filters.labs.map((label, index) => <CheckboxItem key={index} label={label} isDarkMode={isDarkMode} />)}
            </FilterBox2>

            <FilterBox2 title="Districts" Icon={FlaskConical} isDarkMode={isDarkMode}>
                {filters.district.map((label, index) => <CheckboxItem key={index} label={label} isDarkMode={isDarkMode} />)}
            </FilterBox2>
        </div>
    );
};

export default FilterPanel;
