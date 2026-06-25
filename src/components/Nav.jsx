const LABELS = {
  en: {
    portfolio: 'Portfolio Overview', portfolioSub: 'Clarity PPM',
    schedule:  'Program Schedule',   scheduleSub:  'MS Project / Gantt',
    sprint:    'Sprint Board',       sprintSub:    'Jira / Agile',
    pulse:     'Program Pulse',
    projects:  'Projects', currentSprint: 'Current sprint',
    teamLoad:  'Team load', budgetUsed: 'Budget used',
    active:    'active',
    about:     'About this Dashboard',
    tour:      'Guided Tour',
  },
  fr: {
    portfolio: 'Aperçu du Portefeuille', portfolioSub: 'Clarity GPA',
    schedule:  'Calendrier du Programme', scheduleSub: 'MS Project / Gantt',
    sprint:    'Tableau de Sprint',       sprintSub:   'Jira / Agile',
    pulse:     'Pouls du Programme',
    projects:  'Projets', currentSprint: 'Sprint actuel',
    teamLoad:  'Charge équipe', budgetUsed: 'Budget utilisé',
    active:    'actifs',
    about:     'À propos du Tableau',
    tour:      'Visite Guidée',
  },
}

export default function Nav({ activeTab, setActiveTab, onAbout, onTour, lang, setLang }) {
  const t = LABELS[lang]

  const tabs = [
    {
      id: 'clarity', label: t.portfolio, sub: t.portfolioSub,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    },
    {
      id: 'gantt', label: t.schedule, sub: t.scheduleSub,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><rect x="5" y="4" width="8" height="4" rx="1" fill="currentColor" stroke="none" opacity="0.6"/><rect x="10" y="10" width="7" height="4" rx="1" fill="currentColor" stroke="none" opacity="0.6"/><rect x="6" y="16" width="5" height="4" rx="1" fill="currentColor" stroke="none" opacity="0.6"/></svg>,
    },
    {
      id: 'jira', label: t.sprint, sub: t.sprintSub,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="12" rx="1"/><rect x="17" y="3" width="4" height="8" rx="1"/></svg>,
    },
  ]

  return (
    <div className="w-60 bg-slate-950 flex flex-col border-r border-slate-800 shrink-0">
      {/* Branding + lang toggle */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 shrink-0 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-bold text-white">CSA</div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white leading-tight truncate">Digital Transformation</div>
              <div className="text-xs text-slate-500 leading-tight truncate">Portfolio Dashboard</div>
            </div>
          </div>
          {/* EN/FR toggle — equal-width segments, never compressed */}
          <button
            data-tour="lang"
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            aria-label="Toggle language"
            className="flex shrink-0 items-center bg-slate-800 border border-slate-700 rounded-md overflow-hidden text-xs font-bold"
          >
            <span className={`w-8 py-1.5 text-center transition-colors ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>EN</span>
            <span className={`w-8 py-1.5 text-center border-l border-slate-700 transition-colors ${lang === 'fr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>FR</span>
          </button>
        </div>
        <div className="px-2.5 py-1 bg-blue-950 border border-blue-800/50 rounded-md text-xs text-blue-400 text-center">
          {lang === 'fr' ? 'EF 2025–26 · T1–T2' : 'FY 2025–26 · Q1–Q2'}
        </div>
      </div>

      {/* Nav */}
      <nav data-tour="nav" className="flex-1 p-3 space-y-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-3 py-3 rounded-lg transition-all flex items-center gap-3 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={activeTab === tab.id ? 'text-white' : 'text-slate-500'}>{tab.icon}</span>
            <div>
              <div className="text-sm font-medium leading-tight">{tab.label}</div>
              <div className={`text-xs leading-tight mt-0.5 ${activeTab === tab.id ? 'text-blue-200' : 'text-slate-600'}`}>{tab.sub}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* Status + about */}
      <div className="p-3 space-y-2 border-t border-slate-800">
        <div className="bg-slate-900 rounded-lg p-3 text-xs space-y-1.5">
          <div className="text-slate-400 font-medium mb-2">{t.pulse}</div>
          <div className="flex justify-between text-slate-400"><span>{t.projects}</span><span className="text-white font-medium">3 {t.active}</span></div>
          <div className="flex justify-between text-slate-400"><span>{t.currentSprint}</span><span className="text-yellow-400 font-medium">3 / 8</span></div>
          <div className="flex justify-between text-slate-400"><span>{t.teamLoad}</span><span className="text-red-400 font-medium">118%</span></div>
          <div className="flex justify-between text-slate-400"><span>{t.budgetUsed}</span><span className="text-white font-medium">47%</span></div>
        </div>
        <button
          onClick={onTour}
          className="w-full px-3 py-2 rounded-lg text-xs font-medium text-blue-300 bg-blue-950/60 border border-blue-800/50 hover:bg-blue-900/60 hover:text-white transition-colors text-left flex items-center gap-2"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
          {t.tour}
        </button>
        <button
          onClick={onAbout}
          className="w-full px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-white hover:bg-slate-800 transition-colors text-left flex items-center gap-2"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          {t.about}
        </button>
      </div>
    </div>
  )
}
