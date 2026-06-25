import { useState } from 'react'
import { ganttRows } from '../data/mockData'

const T = {
  en: {
    title: 'Program Schedule',
    subtitle: 'CSA Digital Transformation · Jan–Jun 2025 · Hybrid delivery (Waterfall milestones + Agile sprints)',
    legendMilestone: 'Milestone',
    legendToday: 'Today (Mar 17)',
    colHeader: 'Task / Milestone',
    progress: 'Progress', assignee: 'Assignee',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    stats: [
      { label: 'Program Duration', value: '26 wks', sub: 'Jan 6 – Jun 27, 2025' },
      { label: 'Active Projects',  value: '3',      sub: '1 on critical path'    },
      { label: 'Milestones',       value: '2',      sub: '0 missed · 2 upcoming' },
      { label: 'Program Progress', value: '34%',    sub: '↑ 8 pts this month'    },
    ],
  },
  fr: {
    title: 'Calendrier du Programme',
    subtitle: "Transformation Numérique de l'ASC · Janv.–Juin 2025 · Livraison hybride (jalons Waterfall + sprints Agile)",
    legendMilestone: 'Jalon',
    legendToday: 'Aujourd’hui (17 mars)',
    colHeader: 'Tâche / Jalon',
    progress: 'Avancement', assignee: 'Affecté à',
    months: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil'],
    stats: [
      { label: 'Durée du Programme',    value: '26 sem', sub: '6 janv – 27 juin 2025'    },
      { label: 'Projets Actifs',        value: '3',      sub: '1 sur le chemin critique' },
      { label: 'Jalons',                value: '2',      sub: '0 manqué · 2 à venir'     },
      { label: 'Avancement du Programme', value: '34%',  sub: '↑ 8 pts ce mois-ci'       },
    ],
  },
}

const TODAY_PCT = (() => {
  const S = new Date(2025, 0, 1).getTime()
  const E = new Date(2025, 6, 1).getTime()
  return +((new Date(2025, 2, 17).getTime() - S) / (E - S) * 100).toFixed(2)
})()

function TaskBar({ row, t }) {
  const [tip, setTip] = useState(false)
  return (
    <div
      className="absolute flex items-center"
      style={{ left: `${row.left}%`, width: `${row.width}%`, top: '7px', height: '20px' }}
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <div className="w-full h-full rounded-md relative overflow-hidden" style={{ background: `${row.color}28`, border: `1px solid ${row.color}70` }}>
        <div className="absolute top-0 left-0 h-full rounded-l-md" style={{ width: `${row.progress}%`, background: `${row.color}88` }} />
        <span className="absolute inset-0 flex items-center px-1.5 text-xs text-white/70 font-mono truncate z-10 leading-none">
          {row.assignee} · {row.progress}%
        </span>
      </div>
      {tip && (
        <div className="absolute bottom-7 left-0 z-30 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl whitespace-nowrap pointer-events-none">
          <div className="font-medium text-white mb-1">{row.label}</div>
          <div className="text-slate-400">{t.progress}: <span className="text-white">{row.progress}%</span></div>
          <div className="text-slate-400">{t.assignee}: <span className="text-white">{row.assignee}</span></div>
        </div>
      )}
    </div>
  )
}

function MilestoneMarker({ row }) {
  const [tip, setTip] = useState(false)
  // Cap at 94% so the diamond never bleeds past the container edge
  const safeLeft = Math.min(row.left, 94)
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: `calc(${safeLeft}% - 8px)`, top: '6px' }}
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <div
        className="w-4 h-4 rotate-45 cursor-pointer hover:scale-125 transition-transform"
        style={{ background: row.color, boxShadow: `0 0 6px ${row.color}88` }}
      />
      {tip && (
        <div className="absolute bottom-7 left-0 z-30 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl whitespace-nowrap pointer-events-none">
          <div className="font-medium" style={{ color: row.color }}>{row.label.replace('★  ', '')}</div>
        </div>
      )}
    </div>
  )
}

export default function GanttView({ lang = 'en' }) {
  const t = T[lang]
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">{t.title}</h1>
        <p className="text-slate-400 text-sm mt-0.5">{t.subtitle}</p>
      </div>

      <div className="flex items-center gap-5 flex-wrap text-xs text-slate-400">
        {[['#3b82f6','Cloud Migration'],['#10b981','Staff Training'],['#f97316','Legacy Decommission']].map(([color, label]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-10 h-2.5 rounded" style={{ background: `${color}80`, border: `1px solid ${color}` }} />
            <span>{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rotate-45 bg-yellow-500" /><span>{t.legendMilestone}</span></div>
        <div className="flex items-center gap-1.5"><div className="w-px h-4 bg-red-400" /><span className="text-red-400">{t.legendToday}</span></div>
      </div>

      <div data-tour="gantt" className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="flex border-b border-slate-700">
          <div className="w-56 shrink-0 p-3 text-xs font-medium text-slate-500 border-r border-slate-700 uppercase tracking-wider">{t.colHeader}</div>
          <div className="flex-1 flex">
            {t.months.map((m, i) => (
              <div key={m} className={`flex-1 py-2.5 text-xs text-slate-500 text-center ${i < t.months.length - 1 ? 'border-r border-slate-700/50' : ''}`}>{m}</div>
            ))}
          </div>
        </div>

        {ganttRows.map((row, i) => (
          <div key={i} className={`flex border-b border-slate-700/40 last:border-b-0 ${row.type === 'project' ? 'bg-slate-900/50' : 'hover:bg-slate-700/20 transition-colors'}`}>
            <div className={`w-56 shrink-0 px-3 border-r border-slate-700/50 flex items-center ${row.type === 'project' ? 'py-3' : 'py-2'}`}>
              {row.type === 'project'   && <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: row.color }} /><span className="text-sm font-semibold text-white truncate">{row.label}</span></div>}
              {row.type === 'milestone' && <span className="text-xs pl-4 truncate" style={{ color: row.color }}>{row.label}</span>}
              {row.type === 'task'      && <span className="text-xs text-slate-300 pl-4 truncate">{row.label}</span>}
            </div>
            <div className="flex-1 relative" style={{ height: row.type === 'project' ? '44px' : '34px' }}>
              {[1,2,3,4,5,6].map(n => (
                <div key={n} className="absolute top-0 bottom-0 w-px bg-slate-700/30" style={{ left: `${(n/7)*100}%` }} />
              ))}
              <div className="absolute top-0 bottom-0 w-px bg-red-400/50 z-10" style={{ left: `${TODAY_PCT}%` }} />
              {row.type === 'task'      && <TaskBar row={row} t={t} />}
              {row.type === 'milestone' && <MilestoneMarker row={row} />}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {t.stats.map(s => (
          <div key={s.label} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
