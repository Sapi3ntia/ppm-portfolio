const T = {
  en: {
    title: 'About This Dashboard',
    subtitle: 'CSA Digital Transformation — IT Portfolio Management Simulation',
    p1: 'This is a Project Portfolio Management simulation, built as a portfolio artifact for the IT-02 IT Analyst, Project Portfolio Management role at the Canadian Space Agency. It demonstrates hands-on fluency with the PPM tools named in the selection criteria — Clarity PPM, MS Project, and Jira — in a single bilingual application.',
    p2: 'Clarity PPM is restricted enterprise software with no free tier — an applicant cannot screenshot real work in it. This dashboard reproduces its core logic instead: how project-level data rolls up into portfolio-level executive decisions — RAG health, earned value (SPI/CPI), capacity vs. demand, a live risk register, and budget burn.',
    mapTitle: 'How it maps to the selection criteria',
    rows: [
      { tag: 'Required', color: 'text-blue-400', skill: 'IT Project Portfolio Management Tools', where: 'All three views reproduce the exact tools named in the poster — Clarity PPM (Portfolio Overview), MS Project (Program Schedule), and Jira (Sprint Board).' },
      { tag: 'Required', color: 'text-blue-400', skill: 'Digital & IT Project Management', where: 'Full-lifecycle monitoring and reporting: earned-value metrics, milestone schedule, sprint burndown, and an auto-generated executive (BLUF) narrative.' },
      { tag: 'Required', color: 'text-blue-400', skill: 'Requirements Analysis', where: 'The sprint backlog captures security (ITSG-33), data-retention (Protected B), and offline-sync requirements as delivery-ready user stories.' },
      { tag: 'Required', color: 'text-blue-400', skill: 'Advise & Negotiate', where: 'The Scenario Simulator + risk register model mitigations and a $150K contingency decision for decision-makers — recommendation, not just status.' },
      { tag: 'Required', color: 'text-blue-400', skill: 'Change Management', where: 'The Staff Digital Training workstream drives adoption of new digital behaviours across all 6 branches via change champions and bilingual training.' },
      { tag: 'Imperative', color: 'text-emerald-400', skill: 'Bilingual (B B B)', where: 'Every view, label, and narrative switches live between English and French via the EN/FR toggle.' },
    ],
    footer: 'Simulated program: CSA Digital Transformation Initiative · three sub-projects: secure cloud migration, staff digital training, and legacy system decommissioning. All figures, names, and projects are fictional and for demonstration only — not affiliated with the Canadian Space Agency or any government body.',
    close: 'Close',
  },
  fr: {
    title: 'À propos de ce Tableau de Bord',
    subtitle: "Transformation Numérique de l'ASC — Simulation de Gestion de Portefeuille de Projets",
    p1: "Ceci est une simulation de Gestion de Portefeuille de Projets, conçue comme un artefact de portfolio pour le poste d'Analyste TI-02, Gestion de portefeuille de projets, à l'Agence spatiale canadienne. Elle démontre une maîtrise pratique des outils de GPP nommés dans les critères de sélection — Clarity PPM, MS Project et Jira — dans une seule application bilingue.",
    p2: "Clarity PPM est un logiciel d'entreprise à accès restreint sans version gratuite — un candidat ne peut pas en faire de captures d'écran. Ce tableau de bord en reproduit plutôt la logique de base : comment les données au niveau des projets se consolident en décisions de portefeuille — santé RAV, valeur acquise (IPS/ICP), capacité vs. demande, un registre des risques en direct, et la consommation du budget.",
    mapTitle: 'Correspondance avec les critères de sélection',
    rows: [
      { tag: 'Exigé', color: 'text-blue-400', skill: 'Outils de Gestion de Portefeuille de Projets', where: "Les trois vues reproduisent les outils nommés dans l'affiche — Clarity PPM (Aperçu du Portefeuille), MS Project (Calendrier du Programme) et Jira (Tableau de Sprint)." },
      { tag: 'Exigé', color: 'text-blue-400', skill: 'Gestion de Projets Numériques et TI', where: "Suivi et reddition de comptes sur tout le cycle de vie : valeur acquise, calendrier des jalons, graphique d'avancement, et un narratif exécutif (BLUF) généré automatiquement." },
      { tag: 'Exigé', color: 'text-blue-400', skill: 'Analyse des Besoins', where: 'Le carnet de sprint capture les besoins de sécurité (ITSG-33), de conservation des données (Protégé B) et de synchronisation hors-ligne sous forme de récits prêts à livrer.' },
      { tag: 'Exigé', color: 'text-blue-400', skill: 'Conseiller et Négocier', where: "Le Simulateur de Scénarios et le registre des risques modélisent des atténuations et une décision de contingence de 150 k$ pour les décideurs — une recommandation, pas seulement un statut." },
      { tag: 'Exigé', color: 'text-blue-400', skill: 'Gestion du Changement', where: "Le volet Formation Numérique du Personnel favorise l'adoption de nouveaux comportements numériques dans les 6 directions via des champions du changement et une formation bilingue." },
      { tag: 'Impératif', color: 'text-emerald-400', skill: 'Bilingue (B B B)', where: "Chaque vue, étiquette et narratif bascule en direct entre l'anglais et le français via le sélecteur EN/FR." },
    ],
    footer: "Programme simulé : Initiative de Transformation Numérique de l'ASC · trois sous-projets : migration sécurisée vers le nuage, formation numérique du personnel, et décommissionnement des systèmes hérités. Tous les chiffres, noms et projets sont fictifs et à des fins de démonstration uniquement — sans affiliation avec l'Agence spatiale canadienne ou tout organisme gouvernemental.",
    close: 'Fermer',
  },
}

export default function AboutModal({ onClose, lang = 'en' }) {
  const t = T[lang] || T.en
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">{t.title}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{t.subtitle}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors text-xl leading-none">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-sm text-slate-300 overflow-y-auto">
          <p>{t.p1}</p>
          <p>{t.p2}</p>

          <div className="space-y-2">
            <div className="text-white font-medium">{t.mapTitle}:</div>
            <div className="space-y-2">
              {t.rows.map(row => (
                <div key={row.skill} className="bg-slate-900 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wider ${row.color}`}>{row.tag}</span>
                    <span className="text-white font-medium text-sm">{row.skill}</span>
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed">{row.where}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-500 text-xs border-t border-slate-700 pt-4">{t.footer}</p>
        </div>

        <div className="p-6 pt-4 flex gap-3 border-t border-slate-700 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )
}
