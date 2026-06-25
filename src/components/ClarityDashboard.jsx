import { useState, Fragment } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell, ScatterChart, Scatter, CartesianGrid } from 'recharts'
import { portfolioProjects, capacityData, riskRegister } from '../data/mockData'
import Term from './Term'

const T = {
  en: {
    title:'Portfolio Overview', subtitle:'Executive governance view · CSA Digital Transformation Program · FY 2025–26',
    blufTitle:'Executive Narrative (BLUF)', blufSub:'Bottom Line Up Front — auto-generated from live portfolio data',
    whatIfTitle:'Scenario Simulator', whatIfSub:'Model risk mitigations — dashboard recalculates in real-time',
    s1:'Delay Cloud Migration Phase 2 by 4 weeks',
    s2:'Approve $150K Contingency Fund (Contractors)',
    recalc:'Dashboard recalculated in real-time',
    healthTitle:'Project Health Matrix — EVM', healthSub:'RAG · Schedule Performance Index · Cost Performance Index · delivery risk',
    capTitle:'Resource Capacity vs. Demand', capSub:'Team at 100% baseline — overallocation highlighted red',
    riskTitle:'Risk vs. ROI — Portfolio Positioning', riskSub:'Ideal quadrant: upper-left (low risk, high return)',
    k1:'Total Portfolio Budget', k2:'Budget Remaining', k3:'Projects At Risk', k4:'Peak Team Load',
    ths:['Project','Status','Phase','SPI','CPI','Progress','Budget Used','PM','Due Date'],
    evmLegend:'SPI = Schedule Performance Index · CPI = Cost Performance Index · >1.0 favourable · <0.85 critical (EVM standard)',
    onTrack:'On Track', atRisk:'At Risk', critical:'Critical',
    riskTitleReg:'Risk Register — Top Program Risks', riskSubReg:'Probability × impact exposure · response · owner · linked to the Scenario Simulator',
    rTh:['Risk','Likelihood','Impact','Exposure','Owner','Response','Status'],
    expL:{ critical:'Critical', high:'High', medium:'Medium', low:'Low' },
    pL:{ H:'High', M:'Med', L:'Low' },
    statusL:{ open:'Open', mitigating:'Mitigating', mitigated:'Mitigated' },
    simTag:'↳ modelled in Scenario Simulator',
    blufLabel:'Executive Narrative', healthLabel:'Project Health Matrix —',
    riskPre:'Risk vs. ', riskPost:' — Portfolio Positioning',
    asOf:'Data as of 17 Mar 2025  ·  Reporting period FY25 Q1–Q2  ·  Next gate: Cloud Env Ready (28 Mar)',
    evmHint:'Tip — click any project row to expand its full earned-value breakdown (EV · PV · AC · EAC · VAC).',
    whatIs:'What it is',
    fcNote:(eac,bac,vac,cpi)=>`Forecast at completion: EAC ${eac} vs ${bac} budget · variance ${vac} · EAC = BAC ÷ CPI (${cpi}).`,
    tBudget:'On plan at the Q1–Q2 midpoint', tRemain:'Runway through Q3–Q4 delivery',
    tRiskOpen:'Legacy on the ADM watch-list', tRiskFund:'Legacy recovering — contingency approved',
    tLoadHot:'Peaks above 100% baseline in April', tLoadOk:'Levelled — within capacity',
  },
  fr: {
    title:'Aperçu du Portefeuille', subtitle:"Vue de gouvernance exécutive · Programme de Transformation Numérique de l'ASC · EF 2025–26",
    blufTitle:'Narrative Exécutif (BLUF)', blufSub:'Conclusion en tête — générée automatiquement depuis les données du portefeuille',
    whatIfTitle:'Simulateur de Scénarios', whatIfSub:'Modélisez les atténuations — le tableau se recalcule en temps réel',
    s1:'Retarder la Phase 2 de la Migration Cloud de 4 semaines',
    s2:'Approuver 150 k$ de Fonds de Contingence (Contracteurs)',
    recalc:'Tableau de bord recalculé en temps réel',
    healthTitle:'Matrice de Santé des Projets — GVA', healthSub:'RAV · Indice de Performance de Calendrier · Indice de Coût-Performance · risque de livraison',
    capTitle:'Capacité vs. Demande en Ressources', capSub:"Équipe à 100% de référence — surallocation en rouge",
    riskTitle:'Risque vs. ROI — Positionnement du Portefeuille', riskSub:'Quadrant idéal: supérieur-gauche (faible risque, rendement élevé)',
    k1:'Budget Total du Portefeuille', k2:'Budget Restant', k3:'Projets à Risque', k4:'Charge Maximale',
    ths:['Projet','Statut','Phase','IPS','ICP','Avancement','Budget Utilisé','GP','Date Cible'],
    evmLegend:'IPS = Indice de Performance de Calendrier · ICP = Indice de Coût-Performance · >1,0 favorable · <0,85 critique',
    onTrack:'Dans les Délais', atRisk:'À Risque', critical:'Critique',
    riskTitleReg:'Registre des Risques — Risques Majeurs du Programme', riskSubReg:'Exposition probabilité × impact · réponse · responsable · lié au Simulateur de Scénarios',
    rTh:['Risque','Probabilité','Impact','Exposition','Responsable','Réponse','Statut'],
    expL:{ critical:'Critique', high:'Élevée', medium:'Moyenne', low:'Faible' },
    pL:{ H:'Élevée', M:'Moy.', L:'Faible' },
    statusL:{ open:'Ouvert', mitigating:'En atténuation', mitigated:'Atténué' },
    simTag:'↳ modélisé dans le Simulateur de Scénarios',
    blufLabel:'Narrative Exécutif', healthLabel:'Matrice de Santé des Projets —',
    riskPre:'Risque vs. ', riskPost:' — Positionnement du Portefeuille',
    asOf:'Données au 17 mars 2025  ·  Période de référence EF25 T1–T2  ·  Prochain jalon : Environnement infonuagique prêt (28 mars)',
    evmHint:'Astuce — cliquez sur une ligne de projet pour afficher la ventilation complète de la valeur acquise (VA · VP · CR · EAC · VAC).',
    whatIs:'En bref',
    fcNote:(eac,bac,vac,cpi)=>`Prévision à la clôture : EAC ${eac} vs budget ${bac} · écart ${vac} · EAC = BAC ÷ ICP (${cpi}).`,
    tBudget:'Conforme à mi-parcours T1–T2', tRemain:'Marge jusqu’à la livraison T3–T4',
    tRiskOpen:'Héritage sur la liste de surveillance du SMA', tRiskFund:'Héritage en redressement — contingence approuvée',
    tLoadHot:'Pointes au-dessus de 100 % en avril', tLoadOk:'Nivelé — dans la capacité',
  },
}

const RISK_SCORE = { H:3, M:2, L:1 }
function exposure(prob, impact) {
  const s = RISK_SCORE[prob] * RISK_SCORE[impact]
  return s >= 9 ? 'critical' : s >= 6 ? 'high' : s >= 4 ? 'medium' : 'low'
}
const expBadge = {
  critical:'bg-red-500/15 text-red-400 border-red-700/40',
  high:    'bg-orange-500/15 text-orange-400 border-orange-700/40',
  medium:  'bg-yellow-500/15 text-yellow-400 border-yellow-700/40',
  low:     'bg-emerald-500/15 text-emerald-400 border-emerald-700/40',
}
const plBadge     = { H:'text-red-400', M:'text-yellow-400', L:'text-slate-400' }
const statusBadge = {
  open:      'bg-slate-700 text-slate-300',
  mitigating:'bg-blue-500/15 text-blue-400 border border-blue-700/40',
  mitigated: 'bg-emerald-500/15 text-emerald-400 border border-emerald-700/40',
}

// Which EVM table columns get a clickable definition (aligned to t.ths order).
const TH_KEYS = [null, null, null, 'SPI', 'CPI', null, null, null, null]

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun']
const BASE_CAP  = [72, 88, 105, 118, 112,  94]
const DELAY_CAP = [72, 88, 105,  95, 108, 102]
const FUND_CAP  = [72, 88, 105, 102,  98,  94]
const BOTH_CAP  = [72, 88, 105,  88,  96,  99]

function fmt(n) { return n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K` }
function spiColor(v) { return v >= 1 ? 'text-emerald-400' : v >= 0.85 ? 'text-yellow-400' : 'text-red-400' }
function cpiColor(v) { return v >= 1 ? 'text-emerald-400' : v >= 0.85 ? 'text-yellow-400' : 'text-red-400' }

function CapTip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.value
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl">
      <div className="font-semibold text-white mb-1">{label} 2025</div>
      <div className={`font-bold ${d > 100 ? 'text-red-400' : 'text-blue-300'}`}>{d}% demand</div>
      <div className="text-slate-500 mt-0.5">{d > 100 ? `${d-100}% over capacity` : `${100-d}% headroom`}</div>
    </div>
  )
}

function ScatTip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl">
      <div className="font-semibold text-white mb-1">{d.name}</div>
      <div className="text-slate-400">Risk: <span className="text-white">{d.x}/100</span></div>
      <div className="text-slate-400">ROI: <span className="text-emerald-400">{d.y}x</span></div>
    </div>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group" onClick={onChange}>
      <div className="relative mt-0.5 shrink-0">
        <div className={`w-10 h-5 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-slate-600'}`} />
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </div>
      <span className={`text-xs leading-relaxed transition-colors ${checked ? 'text-white' : 'text-slate-400'} group-hover:text-white`}>{label}</span>
    </label>
  )
}

export default function ClarityDashboard({ lang = 'en' }) {
  const [sc, setSc] = useState({ delay: false, fund: false })
  const [openRow, setOpenRow] = useState(null)
  const t = T[lang]

  const demandArr = sc.delay && sc.fund ? BOTH_CAP : sc.delay ? DELAY_CAP : sc.fund ? FUND_CAP : BASE_CAP
  const activeCap = MONTHS.map((m, i) => ({ month: m, demand: demandArr[i] }))
  const peakDemand = Math.max(...demandArr)

  const projects = portfolioProjects.map(p => ({
    ...p,
    cpi:    p.id === 'p3' && sc.fund ? 0.67 : p.cpi,
    health: p.id === 'p3' && sc.fund ? 'yellow' : p.health,
  }))

  const totalBudget = projects.reduce((s,p) => s + p.budget, 0)
  const totalSpent  = projects.reduce((s,p) => s + p.spent,  0)
  const burnPct     = Math.round(totalSpent / totalBudget * 100)
  const atRisk      = projects.filter(p => p.health !== 'green').length
  const scatData    = projects.map(p => ({ x: p.risk, y: p.roi, name: p.name, health: p.health }))

  const riskStatus  = r =>
    r.link === 'delay' && sc.delay ? 'mitigated' :
    r.link === 'fund'  && sc.fund  ? 'mitigating' :
    r.base

  const healthDot   = { green:'bg-emerald-500', yellow:'bg-yellow-400', red:'bg-red-500' }
  const healthText  = { green:'text-emerald-400', yellow:'text-yellow-400', red:'text-red-400' }
  const healthBadge = { green:'bg-emerald-500/15 border-emerald-700/40', yellow:'bg-yellow-500/15 border-yellow-700/40', red:'bg-red-500/15 border-red-700/40' }
  const healthLabel = { green: t.onTrack, yellow: t.atRisk, red: t.critical }

  const p3        = projects.find(p => p.id === 'p3')
  const legacyEac = p3 && p3.cpi > 0 ? p3.budget / p3.cpi : (p3 ? p3.budget : 0)

  const bluf = [
    sc.fund
      ? { icon:'🟡', msg: lang==='fr' ? `ATTENTION : Décommissionnement Héritage — prévision à la clôture (EAC) ramenée à ${fmt(legacyEac)} avec le fonds de contingence approuvé (ICP 0,67). Surveillance continue requise.` : `WATCH: Legacy Decommission — forecast at completion (EAC) pulled back to ${fmt(legacyEac)} with the contingency fund approved (CPI 0.67). Continued monitoring required.` }
      : { icon:'🔴', msg: lang==='fr' ? `CRITIQUE : Décommissionnement Héritage prévu à ${fmt(legacyEac)} à la clôture contre ${fmt(p3.budget)} de budget (ICP 0,45 · IPS 0,72). Dépendances de cartographie des données non résolues — escalade au SMA requise.` : `CRITICAL: Legacy Decommission forecast to ${fmt(legacyEac)} at completion vs ${fmt(p3.budget)} budget (CPI 0.45 · SPI 0.72). Data-mapping dependencies unresolved — ADM escalation required.` },
    sc.delay
      ? { icon:'🟢', msg: lang==='fr' ? `RÉSOLU : Phase 2 de Migration Cloud retardée de 4 semaines — charge de l'équipe normalisée à ${peakDemand}%. Nivellement des ressources efficace.` : `RESOLVED: Cloud Migration Phase 2 delayed 4 weeks — team load normalized to ${peakDemand}%. Resource leveling effective.` }
      : { icon:'🟡', msg: lang==='fr' ? `ATTENTION : Charge de l'équipe de Migration Cloud à ${peakDemand}% en avril. Nivellement des ressources requis avant la Phase 2.` : `WATCH: Cloud Migration team at ${peakDemand}% capacity in April. Resource leveling required before Phase 2 kick-off.` },
    { icon:'🟢', msg: lang==='fr' ? `SUR LA BONNE VOIE : ${fmt(totalBudget-totalSpent)} restant dans le budget. Clôture de sécurité ITSG-33 franchie. Formation du Personnel ICP 1,24 — sous budget.` : `ON TRACK: ${fmt(totalBudget-totalSpent)} remaining in budget. ITSG-33 security gate cleared. Staff Training CPI 1.24 — under budget and delivering value.` },
  ]

  const kpis = [
    { label:t.k1, value:fmt(totalBudget), sub: lang==='fr' ? `${fmt(totalSpent)} dépensé (${burnPct}% consommé)` : `${fmt(totalSpent)} spent (${burnPct}% burn)`, bar:burnPct, barColor:burnPct>80?'bg-red-500':'bg-blue-500', accent:'text-white', trend:t.tBudget, trendColor:'text-slate-500' },
    { label:t.k2, value:fmt(totalBudget-totalSpent), sub: lang==='fr' ? `Réparti sur ${projects.length} projets actifs` : `Across ${projects.length} active projects`, accent:'text-emerald-400', trend:t.tRemain, trendColor:'text-slate-500' },
    { label:t.k3, value: lang==='fr' ? `${atRisk} sur ${projects.length}` : `${atRisk} of ${projects.length}`, sub: sc.fund ? (lang==='fr'?'1 surveillé · 1 en redressement':'1 watch · 1 recovering') : (lang==='fr'?'1 critique · 1 surveillé':'1 critical · 1 watch'), accent:atRisk>1?'text-yellow-400':'text-emerald-400', trend: sc.fund?t.tRiskFund:t.tRiskOpen, trendColor: sc.fund?'text-emerald-400':'text-red-400' },
    { label:t.k4, value:`${peakDemand}%`, sub: sc.delay ? (lang==='fr'?'Avr 2025 — nivelé ✓':'Apr 2025 — normalized ✓') : (lang==='fr'?'Avr 2025 — suralloué':'Apr 2025 — overallocated'), accent:peakDemand>100?'text-red-400':'text-emerald-400', trend: peakDemand>100?t.tLoadHot:t.tLoadOk, trendColor: peakDemand>100?'text-red-400':'text-emerald-400' },
  ]

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">{t.title}</h1>
        <p className="text-slate-400 text-sm mt-0.5">{t.subtitle}</p>
        <p className="text-slate-500 text-xs mt-1">{t.asOf}</p>
      </div>

      {/* BLUF */}
      <div data-tour="bluf" className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-4 bg-blue-500 rounded-full" />
          <h2 className="text-sm font-semibold text-white">{t.blufLabel} (<Term k="BLUF" lang={lang}>BLUF</Term>)</h2>
          <span className="text-xs text-slate-500 ml-1">— {t.blufSub}</span>
        </div>
        <div className="space-y-2">
          {bluf.map((b,i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="shrink-0 text-base leading-tight">{b.icon}</span>
              <span className="text-slate-300 leading-snug">{b.msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What-If + KPIs */}
      <div className="grid grid-cols-5 gap-4">
        <div data-tour="simulator" className="col-span-2 bg-slate-800 rounded-xl border border-blue-800/50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-white">{t.whatIfTitle}</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">{t.whatIfSub}</p>
          <div className="space-y-4">
            <Toggle checked={sc.delay} onChange={() => setSc(s => ({...s, delay:!s.delay}))} label={t.s1} />
            <Toggle checked={sc.fund}  onChange={() => setSc(s => ({...s, fund:!s.fund}))}  label={t.s2} />
          </div>
          {(sc.delay || sc.fund) && (
            <div className="mt-4 pt-3 border-t border-slate-700 text-xs text-blue-400">↻ {t.recalc}</div>
          )}
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-3">
          {kpis.map(k => (
            <div key={k.label} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-xs text-slate-500 mb-1">{k.label}</div>
              <div className={`text-2xl font-bold ${k.accent}`}>{k.value}</div>
              {k.bar != null && <div className="mt-2 mb-1 h-1.5 bg-slate-700 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all ${k.barColor}`} style={{width:`${k.bar}%`}}/></div>}
              <div className="text-xs text-slate-500 mt-1">{k.sub}</div>
              {k.trend && <div className={`text-xs mt-1.5 ${k.trendColor}`}>{k.trend}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* EVM Table */}
      <div data-tour="evm" className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">{t.healthLabel} <Term k="EVM" lang={lang}>EVM</Term></h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.healthSub}</p>
            <p className="text-xs text-slate-600 mt-0.5">{t.evmHint}</p>
          </div>
          <div className="text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-700">{lang==='fr'?'EF25 T1–T2':'FY25 Q1–Q2'}</div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-xs text-slate-500 uppercase tracking-wider">
              {t.ths.map((h, idx) => <th key={h} className="px-4 py-2.5 text-left font-medium">{TH_KEYS[idx] ? <Term k={TH_KEYS[idx]} lang={lang}>{h}</Term> : h}</th>)}
            </tr>
          </thead>
          <tbody>
            {projects.map(p => {
              const budgetPct = Math.round(p.spent/p.budget*100)
              const budgetBar = budgetPct>90?'bg-red-500':budgetPct>70?'bg-yellow-500':'bg-emerald-500'
              const bac = p.budget, ac = p.spent
              const ev  = (p.progress/100)*bac
              const pv  = p.spi>0 ? ev/p.spi : ev
              const eac = p.cpi>0 ? bac/p.cpi : bac
              const vac = bac - eac
              const vacStr = (vac<0?'-':'+') + fmt(Math.abs(vac))
              const cells = [
                { k:'BAC', v:fmt(bac) },
                { k:'EV',  v:fmt(ev)  },
                { k:'PV',  v:fmt(pv)  },
                { k:'AC',  v:fmt(ac)  },
                { k:'EAC', v:fmt(eac), color: eac>bac?'text-red-400':'text-emerald-400' },
                { k:'VAC', v:vacStr,   color: vac<0?'text-red-400':'text-emerald-400' },
              ]
              const isOpen = openRow === p.id
              return (
                <Fragment key={p.id}>
                  <tr onClick={() => setOpenRow(isOpen ? null : p.id)} className="border-b border-slate-700/40 hover:bg-slate-700/20 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-medium text-white">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`text-slate-500 text-[10px] transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                        {p.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs ${healthBadge[p.health]}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${healthDot[p.health]}`} />
                        <span className={healthText[p.health]}>{healthLabel[p.health]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{p.phase}</span></td>
                    <td className={`px-4 py-3 font-mono text-sm font-bold ${spiColor(p.spi)}`}>{p.spi.toFixed(2)}</td>
                    <td className={`px-4 py-3 font-mono text-sm font-bold ${cpiColor(p.cpi)}`}>{p.cpi.toFixed(2)}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{width:`${p.progress}%`}}/></div><span className="text-xs text-slate-400 font-mono">{p.progress}%</span></div></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden"><div className={`h-full rounded-full ${budgetBar}`} style={{width:`${budgetPct}%`}}/></div><span className="text-xs text-slate-400 font-mono">{budgetPct}%</span></div></td>
                    <td className="px-4 py-3 text-xs text-slate-300">{p.pm}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{p.due}</td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-slate-900/40 border-b border-slate-700/40">
                      <td colSpan={t.ths.length} className="px-4 py-4">
                        {p.desc && (
                          <p className="text-xs text-slate-300 leading-relaxed mb-3 max-w-3xl">
                            <span className="text-slate-500 font-medium uppercase tracking-wider mr-1.5">{t.whatIs}</span>
                            {p.desc[lang] || p.desc.en}
                          </p>
                        )}
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                          {cells.map(c => (
                            <div key={c.k} className="bg-slate-800/70 rounded-lg p-2.5 border border-slate-700/50">
                              <div className="text-xs text-slate-500 mb-0.5"><Term k={c.k} lang={lang}>{c.k}</Term></div>
                              <div className={`text-sm font-mono font-bold ${c.color || 'text-white'}`}>{c.v}</div>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-slate-500 mt-2.5">{t.fcNote(fmt(eac), fmt(bac), vacStr, p.cpi.toFixed(2))}</div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
        <div className="px-5 py-2 border-t border-slate-700/50 bg-slate-900/30 text-xs text-slate-500">{t.evmLegend}</div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-white">{t.capTitle}</h3>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">{t.capSub}</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activeCap} margin={{top:10,right:10,left:-20,bottom:0}}>
              <XAxis dataKey="month" stroke="#334155" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis stroke="#334155" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false} domain={[0,130]}/>
              <Tooltip content={<CapTip />} cursor={{fill:'#334155',opacity:0.3}}/>
              <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="4 3" label={{value:'100%',fill:'#f59e0b',fontSize:10,position:'insideTopRight'}}/>
              <Bar dataKey="demand" radius={[4,4,0,0]}>
                {activeCap.map((e,i) => <Cell key={i} fill={e.demand>100?'#ef4444':'#3b82f6'}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-white">{t.riskPre}<Term k="ROI" lang={lang}>ROI</Term>{t.riskPost}</h3>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">{t.riskSub}</p>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart margin={{top:10,right:20,left:-10,bottom:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
              <XAxis type="number" dataKey="x" name="Risk" domain={[0,100]} stroke="#334155" tick={{fill:'#64748b',fontSize:11}} label={{value:'Risk →',fill:'#475569',fontSize:10,position:'insideBottom',offset:-2}}/>
              <YAxis type="number" dataKey="y" name="ROI"  domain={[0,4]}   stroke="#334155" tick={{fill:'#64748b',fontSize:11}}/>
              <Tooltip content={<ScatTip />} cursor={{strokeDasharray:'3 3',stroke:'#475569'}}/>
              <Scatter data={scatData}>
                {scatData.map((e,i) => <Cell key={i} fill={e.health==='green'?'#10b981':e.health==='yellow'?'#f59e0b':'#ef4444'} r={10}/>)}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-5 mt-2">
            {projects.map(p => <div key={p.id} className="flex items-center gap-1.5 text-xs text-slate-400"><div className={`w-2.5 h-2.5 rounded-full ${healthDot[p.health]}`}/>{p.name}</div>)}
          </div>
        </div>
      </div>

      {/* Risk Register */}
      <div data-tour="risk-register" className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-700">
          <h2 className="text-sm font-semibold text-white">{t.riskTitleReg}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{t.riskSubReg}</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-xs text-slate-500 uppercase tracking-wider">
              {t.rTh.map(h => <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {riskRegister.map(r => {
              const exp = exposure(r.prob, r.impact)
              const st  = riskStatus(r)
              const loc = r[lang] || r.en
              return (
                <tr key={r.id} className="border-b border-slate-700/40 last:border-b-0 hover:bg-slate-700/20 transition-colors align-top">
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: r.color }} />
                      <div>
                        <div className="text-white text-xs font-medium leading-snug">{loc.title}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{r.id} · {r.project}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold ${plBadge[r.prob]}`}>{t.pL[r.prob]}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold ${plBadge[r.impact]}`}>{t.pL[r.impact]}</span></td>
                  <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded border text-xs ${expBadge[exp]}`}>{t.expL[exp]}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-300 whitespace-nowrap">{r.owner}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-slate-300 leading-snug max-w-xs">{loc.mitigation}</div>
                    {r.link && <div className="text-xs text-blue-400/70 mt-0.5">{t.simTag}</div>}
                  </td>
                  <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded text-xs ${statusBadge[st]}`}>{t.statusL[st]}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
