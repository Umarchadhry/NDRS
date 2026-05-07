export const THEME = {
  // Accent Colors
  ACCENT_COLOR: '#00E5FF',
  ACCENT_COLOR_SOFT: 'from-cyan-400 to-teal-500',

  // States
  DANGER_COLOR: '#EF4444',
  SUCCESS_COLOR: '#10B981',

  // Light Mode
  L_PRIMARY_NAVY: 'bg-[#0E7490]', // Deep teal
  L_PRIMARY_GRADIENT: 'bg-gradient-to-r from-cyan-700 to-teal-500',
  L_CARD_BG: 'bg-white/90 backdrop-blur-xl',
  L_BODY_BG: 'bg-gradient-to-br from-gray-100 to-blue-50',
  L_ACTIVE_BG: 'bg-gradient-to-r from-cyan-500 to-teal-700 text-white shadow-md',
  L_DARK_COLOR: 'bg-gradient-to-b from-[#0E7490] to-[#0F172A]',

  // Dark Mode
  D_PRIMARY_NAVY: 'bg-[#0F172A]',
  D_PRIMARY_GRADIENT: 'bg-gradient-to-r from-cyan-100 to-teal-100',
  D_CARD_BG: 'bg-slate-800/70 backdrop-blur-2xl',
  D_BODY_BG: 'bg-gradient-to-b from-slate-900 to-slate-800',
  D_ACTIVE_BG: 'bg-gradient-to-r from-cyan-600 to-teal-800 text-white shadow-lg',
  D_DARK_COLOR: 'bg-gradient-to-b from-slate-900 to-slate-800'
};

export const SHADOW_STYLE = `
  shadow-xl transition-all duration-300 
  hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]
  hover:-translate-y-1
`;
