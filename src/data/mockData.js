export const initialSprintData = {
  columnOrder: ['backlog', 'todo', 'inprogress', 'done'],
  columns: {
    backlog:    { id: 'backlog',    title: 'Backlog',      wipLimit: null, cardIds: ['card-1','card-2','card-3','card-4'] },
    todo:       { id: 'todo',       title: 'To Do',        wipLimit: 4,    cardIds: ['card-5','card-6','card-7'] },
    inprogress: { id: 'inprogress', title: 'In Progress',  wipLimit: 3,    cardIds: ['card-8','card-9','card-10'] },
    done:       { id: 'done',       title: 'Done',         wipLimit: null, cardIds: ['card-11','card-12','card-13'] },
  },
  cards: {
    'card-1':  { id:'card-1',  title:'Define cloud storage security requirements (ITSG-33 alignment)',    epic:'Infrastructure', points:5,  assignee:'MT', priority:'high'   },
    'card-2':  { id:'card-2',  title:'Audit legacy data formats for migration compatibility',              epic:'Legacy',         points:8,  assignee:'SP', priority:'medium' },
    'card-3':  { id:'card-3',  title:'Draft offline-sync requirements for remote field researchers',      epic:'Infrastructure', points:3,  assignee:'JB', priority:'high'   },
    'card-4':  { id:'card-4',  title:'Identify change champions per branch (all 6 divisions)',            epic:'Training',       points:2,  assignee:'AS', priority:'low'    },
    'card-5':  { id:'card-5',  title:'Provision staging environment on Azure Government Cloud',           epic:'Infrastructure', points:8,  assignee:'MT', priority:'high'   },
    'card-6':  { id:'card-6',  title:'Design EN/FR quick-start guide for CSA researchers',               epic:'Training',       points:3,  assignee:'JB', priority:'medium' },
    'card-7':  { id:'card-7',  title:'Document data retention policies per Protected B classification',   epic:'Legacy',         points:5,  assignee:'SP', priority:'medium' },
    'card-8':  { id:'card-8',  title:'Configure SSO integration with GCKey (OAuth 2.0 federation)',      epic:'Infrastructure', points:13, assignee:'SP', priority:'high'   },
    'card-9':  { id:'card-9',  title:'Develop bilingual training video scripts (4 modules)',              epic:'Training',       points:5,  assignee:'AS', priority:'medium' },
    'card-10': { id:'card-10', title:'Map legacy data migration paths, volumes, and dependencies',        epic:'Legacy',         points:8,  assignee:'MT', priority:'high'   },
    'card-11': { id:'card-11', title:'Complete ITSG-33 security assessment — all controls signed off',   epic:'Infrastructure', points:13, assignee:'SP', priority:'high'   },
    'card-12': { id:'card-12', title:'All-branches stakeholder kickoff (ADMs + DGs in attendance)',       epic:'Training',       points:2,  assignee:'JB', priority:'medium' },
    'card-13': { id:'card-13', title:'Define Definition of Done (DoD) for all migration user stories',   epic:'Legacy',         points:1,  assignee:'AS', priority:'low'    },
  },
}

export const epicStyle = {
  Infrastructure: 'bg-blue-900/60 text-blue-300 border border-blue-700/60',
  Training:       'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60',
  Legacy:         'bg-orange-900/60 text-orange-300 border border-orange-700/60',
}

export const priorityDot = {
  high:   'bg-red-500',
  medium: 'bg-yellow-400',
  low:    'bg-slate-500',
}

export const burndownData = [
  { day:'D1',  ideal:65, actual:65 },
  { day:'D2',  ideal:59, actual:62 },
  { day:'D3',  ideal:52, actual:56 },
  { day:'D4',  ideal:46, actual:51 },
  { day:'D5',  ideal:39, actual:44 },
  { day:'D6',  ideal:33, actual:38 },
  { day:'D7',  ideal:26, actual:33 },
  { day:'D8',  ideal:20, actual:29 },
  { day:'D9',  ideal:13, actual:null },
  { day:'D10', ideal:7,  actual:null },
  { day:'D11', ideal:0,  actual:null },
]

const WINDOW_START = new Date(2025, 0, 1).getTime()
const WINDOW_END   = new Date(2025, 6, 1).getTime()
const WINDOW_SPAN  = WINDOW_END - WINDOW_START

function left(dateStr) {
  return +((new Date(dateStr).getTime() - WINDOW_START) / WINDOW_SPAN * 100).toFixed(2)
}
function width(startStr, endStr) {
  return +((new Date(endStr).getTime() - new Date(startStr).getTime()) / WINDOW_SPAN * 100).toFixed(2)
}

export const ganttRows = [
  { type:'project',   label:'Cloud Migration',             color:'#3b82f6' },
  { type:'task',      label:'ITSG-33 Security Assessment',            left:left('2025-01-06'), width:width('2025-01-06','2025-02-14'), color:'#3b82f6', progress:100, assignee:'SP' },
  { type:'task',      label:'Infrastructure Provisioning (Azure GC)', left:left('2025-02-17'), width:width('2025-02-17','2025-03-28'), color:'#3b82f6', progress:80,  assignee:'MT' },
  { type:'milestone', label:'★  Cloud Env Ready',          left:left('2025-03-28'), color:'#f59e0b' },
  { type:'task',      label:'Data Migration — Pilot Branch',          left:left('2025-04-01'), width:width('2025-04-01','2025-05-30'), color:'#60a5fa', progress:30,  assignee:'MT' },
  { type:'task',      label:'Full Cutover & Legacy Shutdown',         left:left('2025-06-02'), width:width('2025-06-02','2025-06-27'), color:'#60a5fa', progress:0,   assignee:'SP' },
  { type:'project',   label:'Staff Digital Training',      color:'#10b981' },
  { type:'task',      label:'Change Impact Assessment',               left:left('2025-02-03'), width:width('2025-02-03','2025-02-28'), color:'#10b981', progress:100, assignee:'JB' },
  { type:'task',      label:'Training Material Development (EN/FR)',  left:left('2025-03-03'), width:width('2025-03-03','2025-04-18'), color:'#10b981', progress:60,  assignee:'AS' },
  { type:'task',      label:'Phased Rollout — All 6 Branches',       left:left('2025-04-21'), width:width('2025-04-21','2025-06-27'), color:'#34d399', progress:10,  assignee:'JB' },
  { type:'project',   label:'Legacy System Decommission',  color:'#f97316' },
  { type:'task',      label:'Legacy Audit & Data Inventory',          left:left('2025-01-20'), width:width('2025-01-20','2025-03-07'), color:'#f97316', progress:70,  assignee:'SP' },
  { type:'task',      label:'Parallel Run (New + Legacy Systems)',    left:left('2025-04-01'), width:width('2025-04-01','2025-06-27'), color:'#fb923c', progress:5,   assignee:'MT' },
  { type:'milestone', label:'★  Legacy Shutdown',          left:left('2025-06-27'), color:'#ef4444' },
]

export const portfolioProjects = [
  { id:'p1', name:'Cloud Migration',        health:'yellow', phase:'Execution', progress:45, budget:850000, spent:487000, roi:2.4, risk:65, pm:'M. Tremblay', due:'Jun 27, 2025', spi:0.82, cpi:0.79,
    desc:{ en:'Build CSA’s secure Azure Government Cloud environment — ITSG-33 assessed, GCKey sign-on, Protected B — and migrate branch data onto it. Sound work, but the team is over-allocated (118% in April), so schedule and cost are slipping.',
           fr:'Bâtir l’environnement infonuagique Azure sécurisé de l’ASC — évalué ITSG-33, authentification GCKey, Protégé B — et y migrer les données des directions. Travail solide, mais l’équipe est surchargée (118 % en avril), d’où le glissement du calendrier et des coûts.' } },
  { id:'p2', name:'Staff Digital Training', health:'green',  phase:'Execution', progress:38, budget:320000, spent:98000,  roi:3.1, risk:22, pm:'J. Bouchard', due:'Jun 27, 2025', spi:0.95, cpi:1.24,
    desc:{ en:'Drive staff adoption of the new digital tools across all 6 branches — bilingual EN/FR training and a change champion in each division. On track and under budget (CPI 1.24).',
           fr:'Favoriser l’adoption des nouveaux outils numériques dans les 6 directions — formation bilingue EN/FR et un champion du changement par division. Sur la bonne voie et sous budget (ICP 1,24).' } },
  { id:'p3', name:'Legacy Decommission',    health:'red',    phase:'Planning',  progress:18, budget:540000, spent:215000, roi:1.8, risk:78, pm:'S. Park',     due:'Jun 30, 2025', spi:0.72, cpi:0.45,
    desc:{ en:'Safely retire CSA’s aging legacy systems — inventory and migrate the old data, run new and old in parallel, then shut the legacy platform down. The problem child: unresolved data-mapping dependencies have blown cost (CPI 0.45) and schedule (SPI 0.72).',
           fr:'Mettre hors service en toute sécurité les anciens systèmes hérités de l’ASC — inventorier et migrer les anciennes données, exécuter l’ancien et le nouveau en parallèle, puis fermer la plateforme héritée. Le projet problématique : des dépendances de cartographie non résolues ont fait dériver le coût (ICP 0,45) et le calendrier (IPS 0,72).' } },
]

export const capacityData = [
  { month:'Jan', demand:72  },
  { month:'Feb', demand:88  },
  { month:'Mar', demand:105 },
  { month:'Apr', demand:118 },
  { month:'May', demand:112 },
  { month:'Jun', demand:94  },
]

// Top program risks (RAID-style). `link` ties a risk to a Scenario Simulator
// toggle so its status recomputes live; `base` is the status with no mitigation applied.
export const riskRegister = [
  {
    id:'R-01', project:'Cloud Migration', color:'#3b82f6', prob:'H', impact:'M', owner:'M. Tremblay', link:'delay', base:'open',
    en:{ title:'Team overallocation — demand peaks at 118% in April', mitigation:'Delay Phase 2 by 4 weeks; level resources across workstreams' },
    fr:{ title:'Surcharge de l’équipe — la demande culmine à 118 % en avril', mitigation:'Retarder la Phase 2 de 4 semaines; niveler les ressources entre les volets' },
  },
  {
    id:'R-02', project:'Legacy Decommission', color:'#f97316', prob:'H', impact:'H', owner:'S. Park', link:'fund', base:'open',
    en:{ title:'Cost & schedule overrun — CPI 0.45 / SPI 0.72', mitigation:'Approve $150K contingency (contractors) to recover CPI' },
    fr:{ title:'Dépassement des coûts et du calendrier — ICP 0,45 / IPS 0,72', mitigation:'Approuver 150 k$ de contingence (contracteurs) pour redresser l’ICP' },
  },
  {
    id:'R-03', project:'Legacy Decommission', color:'#f97316', prob:'M', impact:'H', owner:'S. Park', link:null, base:'mitigating',
    en:{ title:'Unresolved legacy data-format & mapping dependencies', mitigation:'Complete legacy audit & data inventory before parallel run' },
    fr:{ title:'Dépendances de format et de cartographie des données héritées non résolues', mitigation:'Achever l’audit et l’inventaire des données avant l’exécution parallèle' },
  },
  {
    id:'R-04', project:'Staff Digital Training', color:'#10b981', prob:'M', impact:'M', owner:'J. Bouchard', link:null, base:'open',
    en:{ title:'Staff resistance to new digital behaviours (all 6 branches)', mitigation:'Change champions per branch + bilingual EN/FR training rollout' },
    fr:{ title:'Résistance du personnel aux nouveaux comportements numériques (6 directions)', mitigation:'Champions du changement par direction + déploiement de la formation bilingue EN/FR' },
  },
]
