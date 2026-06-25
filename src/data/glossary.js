// Clickable-definition glossary. Keyed by concept; `term` is the label shown in
// the popover header, `formula` (optional) is rendered as a mono code line.
export const GLOSSARY = {
  EVM: {
    term: 'EVM — Earned Value Management',
    en: { def: 'A project-controls method that integrates scope, schedule, and cost. It compares what you planned to spend, what you have actually spent, and the value of work actually completed.' },
    fr: { def: 'Méthode de contrôle de projet intégrant portée, calendrier et coût. Elle compare le coût planifié, le coût réel et la valeur du travail réellement accompli.' },
  },
  SPI: {
    term: 'SPI — Schedule Performance Index',
    en: { def: 'How fast work is being completed vs. the plan. Above 1.0 = ahead of schedule; below 0.85 is treated as critical.', formula: 'SPI = EV ÷ PV' },
    fr: { def: 'Vitesse d’avancement vs. le plan. Au-dessus de 1,0 = en avance; sous 0,85 = critique.', formula: 'IPS = VA ÷ VP' },
  },
  CPI: {
    term: 'CPI — Cost Performance Index',
    en: { def: 'Value earned per dollar spent. Above 1.0 = under budget; below 1.0 = over budget. CPI 0.45 means 45¢ of value per $1 spent.', formula: 'CPI = EV ÷ AC' },
    fr: { def: 'Valeur acquise par dollar dépensé. Au-dessus de 1,0 = sous budget; sous 1,0 = dépassement. ICP 0,45 = 45 ¢ de valeur par 1 $ dépensé.', formula: 'ICP = VA ÷ CR' },
  },
  BAC: {
    term: 'BAC — Budget at Completion',
    en: { def: 'The total approved budget for the project — the planned cost if everything goes to plan.', formula: 'BAC = total project budget' },
    fr: { def: 'Le budget total approuvé du projet — le coût prévu si tout se déroule comme prévu.', formula: 'BAC = budget total du projet' },
  },
  EV: {
    term: 'EV — Earned Value',
    en: { def: 'The budgeted value of the work actually completed so far.', formula: 'EV = % complete × BAC' },
    fr: { def: 'La valeur budgétée du travail réellement accompli à ce jour.', formula: 'VA = % achevé × BAC' },
  },
  PV: {
    term: 'PV — Planned Value',
    en: { def: 'The budgeted value of the work that should have been completed by now, per the baseline schedule.', formula: 'PV = EV ÷ SPI' },
    fr: { def: 'La valeur budgétée du travail qui aurait dû être accompli à ce jour, selon le calendrier de référence.', formula: 'VP = VA ÷ IPS' },
  },
  AC: {
    term: 'AC — Actual Cost',
    en: { def: 'The real money actually spent on the work completed so far.', formula: 'AC = actual spend to date' },
    fr: { def: 'L’argent réellement dépensé pour le travail accompli à ce jour.', formula: 'CR = dépenses réelles à ce jour' },
  },
  EAC: {
    term: 'EAC — Estimate at Completion',
    en: { def: 'Forecast of what the project will actually cost in total if current cost performance continues.', formula: 'EAC = BAC ÷ CPI' },
    fr: { def: 'Prévision du coût total réel du projet si la performance de coût actuelle se maintient.', formula: 'EAC = BAC ÷ ICP' },
  },
  VAC: {
    term: 'VAC — Variance at Completion',
    en: { def: 'Forecast budget surplus or overrun at the end. Negative = projected over budget.', formula: 'VAC = BAC − EAC' },
    fr: { def: 'Surplus ou dépassement budgétaire prévu à la fin. Négatif = dépassement prévu.', formula: 'VAC = BAC − EAC' },
  },
  RAG: {
    term: 'RAG — Red / Amber / Green',
    en: { def: 'A traffic-light health rating used in executive reporting. Green = on track, Amber = at risk, Red = critical.' },
    fr: { def: 'Cote de santé en feux de circulation utilisée en reddition de comptes. Vert = sur la bonne voie, Ambre = à risque, Rouge = critique.' },
  },
  BLUF: {
    term: 'BLUF — Bottom Line Up Front',
    en: { def: 'A briefing convention where the conclusion and decision needed are stated first, before the supporting detail. Standard in executive and government communications.' },
    fr: { def: 'Convention de breffage où la conclusion et la décision requise sont énoncées d’abord, avant les détails. Standard dans les communications exécutives et gouvernementales.' },
  },
  ROI: {
    term: 'ROI — Return on Investment',
    en: { def: 'The value a project is expected to return relative to its cost. Shown here as a multiple (e.g. 2.4× = $2.40 returned per $1 invested).', formula: 'ROI = net benefit ÷ cost' },
    fr: { def: 'La valeur qu’un projet devrait rapporter par rapport à son coût. Indiqué ici en multiple (p. ex. 2,4× = 2,40 $ rapporté par 1 $ investi).', formula: 'RCI = bénéfice net ÷ coût' },
  },
  WIP: {
    term: 'WIP — Work In Progress limit',
    en: { def: 'A Kanban/Agile cap on how many items a column may hold at once. Exceeding it (red) signals the team is overloaded and flow is blocked.' },
    fr: { def: 'Plafond Kanban/Agile sur le nombre d’éléments qu’une colonne peut contenir à la fois. Le dépasser (rouge) signale une surcharge de l’équipe.' },
  },
}
