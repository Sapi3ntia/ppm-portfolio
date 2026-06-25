import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { epicStyle, priorityDot, burndownData } from '../data/mockData'
import Term from './Term'

const T = {
  en: {
    title: 'Sprint 3 — Active Board',
    subtitle: 'Digital Transformation Program · 11-day sprint · Mar 17–28, 2025',
    velocity: 'Sprint Velocity',
    pts: 'pts', done: 'Done',
    filterLabel: 'Filter by Epic:',
    epics: [
      { v: 'All', l: 'All' }, { v: 'Infrastructure', l: 'Infrastructure' },
      { v: 'Training', l: 'Training' }, { v: 'Legacy', l: 'Legacy' },
    ],
    columns: { backlog: 'Backlog', todo: 'To Do', inprogress: 'In Progress', done: 'Done' },
    burndownTitle: 'Sprint 3 Burndown Chart',
    burndownSub: 'Remaining story points — actual vs ideal trajectory · Today: Day 8',
    ideal: 'Ideal', actual: 'Actual', today: 'Today',
    warning: '⚠ Actual is tracking 4–6 pts above ideal — sprint at risk of not completing. Recommend de-scoping 1 low-priority story or extending sprint by 1 day.',
  },
  fr: {
    title: 'Sprint 3 — Tableau Actif',
    subtitle: 'Programme de Transformation Numérique · Sprint de 11 jours · 17–28 mars 2025',
    velocity: 'Vélocité du Sprint',
    pts: 'pts', done: 'Terminé',
    filterLabel: 'Filtrer par épopée :',
    epics: [
      { v: 'All', l: 'Toutes' }, { v: 'Infrastructure', l: 'Infrastructure' },
      { v: 'Training', l: 'Formation' }, { v: 'Legacy', l: 'Héritage' },
    ],
    columns: { backlog: 'Carnet', todo: 'À Faire', inprogress: 'En Cours', done: 'Terminé' },
    burndownTitle: 'Graphique d’avancement — Sprint 3',
    burndownSub: 'Points d’histoire restants — trajectoire réelle vs idéale · Aujourd’hui : Jour 8',
    ideal: 'Idéal', actual: 'Réel', today: 'Aujourd’hui',
    warning: '⚠ Le réel dépasse l’idéal de 4–6 pts — le sprint risque de ne pas être complété. Recommandation : retirer 1 histoire de faible priorité ou prolonger le sprint d’1 jour.',
  },
}

const colConfig = {
  backlog:    { border: 'border-slate-700',   header: 'text-slate-300',  badge: 'bg-slate-900' },
  todo:       { border: 'border-blue-800/60', header: 'text-blue-300',   badge: 'bg-blue-950' },
  inprogress: { border: 'border-yellow-700/60', header: 'text-yellow-300', badge: 'bg-yellow-950' },
  done:       { border: 'border-emerald-700/60', header: 'text-emerald-300', badge: 'bg-emerald-950' },
}

function Card({ card, index }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-slate-800 rounded-lg p-3 mb-2 border cursor-grab active:cursor-grabbing transition-all select-none ${
            snapshot.isDragging
              ? 'shadow-xl border-blue-500 ring-1 ring-blue-500/40 scale-[1.02]'
              : 'border-slate-700 hover:border-slate-600'
          }`}
        >
          <div className="flex gap-2 mb-2.5">
            <p className="text-sm text-slate-200 leading-snug flex-1">{card.title}</p>
            <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${priorityDot[card.priority]}`} title={card.priority} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${epicStyle[card.epic]}`}>
              {card.epic}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-mono">{card.assignee}</span>
              <span className="text-xs bg-slate-700 text-slate-300 rounded px-1.5 py-0.5 font-mono font-medium">
                {card.points}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

function Column({ column, cards, filterEpic, t, lang }) {
  const visible = filterEpic === 'All' ? cards : cards.filter(c => c.epic === filterEpic)
  const overWip = column.wipLimit && visible.length > column.wipLimit
  const cfg = colConfig[column.id]

  return (
    <div className={`flex flex-col w-72 shrink-0 bg-slate-800/30 rounded-xl border ${cfg.border}`}>
      {/* Column header */}
      <div className="p-3 border-b border-slate-700/60 flex items-center justify-between">
        <span className={`text-sm font-semibold ${cfg.header}`}>{t.columns[column.id]}</span>
        <div className="flex items-center gap-2">
          {column.wipLimit && (
            <span className={`text-xs px-2 py-0.5 rounded font-mono ${
              overWip ? 'bg-red-900/80 text-red-300 ring-1 ring-red-700' : 'bg-slate-700 text-slate-400'
            }`}>
              {visible.length}/{column.wipLimit} <Term k="WIP" lang={lang}>WIP</Term>
            </span>
          )}
          <span className={`text-xs w-5 h-5 rounded-full flex items-center justify-center font-mono ${cfg.badge} text-slate-300`}>
            {visible.length}
          </span>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 min-h-28 rounded-b-xl transition-colors ${
              snapshot.isDraggingOver ? 'bg-slate-700/25' : ''
            }`}
          >
            {visible.map((card, i) => (
              <Card key={card.id} card={card} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

// Custom burndown tooltip
function BurndownTooltip({ active, payload, label, ptsLabel = 'pts' }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs shadow-xl">
      <div className="font-medium text-slate-200 mb-1.5">{label}</div>
      {payload.map((p, i) => p.value != null && (
        <div key={i} className="flex items-center gap-2 text-slate-300">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span>{p.name}:</span>
          <span className="font-mono text-white">{p.value} {ptsLabel}</span>
        </div>
      ))}
    </div>
  )
}

export default function JiraBoard({ sprintData, setSprintData, lang = 'en' }) {
  const [filterEpic, setFilterEpic] = useState('All')
  const t = T[lang]

  function onDragEnd({ destination, source, draggableId }) {
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const startCol = sprintData.columns[source.droppableId]
    const endCol   = sprintData.columns[destination.droppableId]

    if (startCol.id === endCol.id) {
      const ids = [...startCol.cardIds]
      ids.splice(source.index, 1)
      ids.splice(destination.index, 0, draggableId)
      setSprintData({ ...sprintData, columns: { ...sprintData.columns, [startCol.id]: { ...startCol, cardIds: ids } } })
      return
    }

    const startIds = [...startCol.cardIds]
    startIds.splice(source.index, 1)
    const endIds = [...endCol.cardIds]
    endIds.splice(destination.index, 0, draggableId)
    setSprintData({
      ...sprintData,
      columns: {
        ...sprintData.columns,
        [startCol.id]: { ...startCol, cardIds: startIds },
        [endCol.id]:   { ...endCol,   cardIds: endIds },
      },
    })
  }

  const allCards  = Object.values(sprintData.cards)
  const doneCards = sprintData.columns.done.cardIds.map(id => sprintData.cards[id])
  const totalPts  = allCards.reduce((s, c) => s + c.points, 0)
  const donePts   = doneCards.reduce((s, c) => s + c.points, 0)
  const pct       = Math.round(donePts / totalPts * 100)

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">{t.title}</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {t.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800 rounded-xl px-4 py-3 border border-slate-700">
          <div className="text-right">
            <div className="text-xs text-slate-500">{t.velocity}</div>
            <div className="text-lg font-bold text-white">{donePts} <span className="text-slate-500 text-sm font-normal">/ {totalPts} {t.pts}</span></div>
          </div>
          <div className="w-24">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>{t.done}</span><span>{pct}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Epic filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500 mr-1">{t.filterLabel}</span>
        {t.epics.map(e => (
          <button
            key={e.v}
            onClick={() => setFilterEpic(e.v)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              filterEpic === e.v ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            {e.l}
          </button>
        ))}
      </div>

      {/* Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div data-tour="board" className="flex gap-4 overflow-x-auto pb-2">
          {sprintData.columnOrder.map(colId => {
            const col = sprintData.columns[colId]
            const cards = col.cardIds.map(id => sprintData.cards[id])
            return <Column key={colId} column={col} cards={cards} filterEpic={filterEpic} t={t} lang={lang} />
          })}
        </div>
      </DragDropContext>

      {/* Burndown + legend */}
      <div data-tour="burndown" className="bg-slate-800 rounded-xl border border-slate-700 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white text-sm">{t.burndownTitle}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{t.burndownSub}</p>
          </div>
          <div className="flex items-center gap-5 text-xs mt-0.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 border-t border-dashed border-slate-500" />
              <span className="text-slate-400">{t.ideal}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 border-t-2 border-blue-400" />
              <span className="text-slate-400">{t.actual}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-px h-3 bg-red-400" />
              <span className="text-slate-400">{t.today}</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={burndownData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <XAxis dataKey="day" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 70]} />
            <Tooltip content={<BurndownTooltip ptsLabel={t.pts} />} />
            <ReferenceLine x="D8" stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.6} />
            <Line
              type="monotone" dataKey="ideal" name={t.ideal} stroke="#475569"
              strokeDasharray="5 3" strokeWidth={1.5} dot={false} connectNulls
            />
            <Line
              type="monotone" dataKey="actual" name={t.actual} stroke="#60a5fa"
              strokeWidth={2.5} dot={{ fill: '#60a5fa', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5 }} connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <p className="text-xs text-yellow-400/80 mt-2">
          {t.warning}
        </p>
      </div>
    </div>
  )
}
