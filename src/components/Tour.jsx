import { useState, useEffect, useLayoutEffect, useRef } from 'react'

// Each step points at a [data-tour="target"] element. `tab` switches the active
// view first (null = leave the current view, e.g. the always-visible sidebar).
//
// Two layers of text per step:
//   body  — the clean, audience-facing caption (always shown).
//   note  — presenter-only coaching: what to SAY, the real numbers, the framing.
//   proves— the IT-02 selection criterion this moment demonstrates.
// `note`/`proves` only appear when the Presenter-notes toggle is on, so the tour
// stays clean for a live panel but turns into a rehearsal aid when practising.
const STEPS = [
  { target: 'nav', tab: 'clarity',
    en: { title: 'Three views, three tools', body: 'The sidebar switches between the three PPM tools named in the role — Clarity PPM, MS Project, and Jira. Let’s walk through each.',
      note: 'Set the scene first: “This is CSA’s Digital Transformation program — three projects: move onto a secure cloud, train staff to use it, and retire the old legacy systems.” Then the 30-second hook: “Clarity PPM is restricted software with no free tier — I can’t screenshot real work, so I rebuilt its decision logic across the three tools the poster names.”',
      proves: 'Initiative · IT Project Portfolio Management Tools (required)' },
    fr: { title: 'Trois vues, trois outils', body: 'La barre latérale bascule entre les trois outils de GPP nommés dans le poste — Clarity PPM, MS Project et Jira. Parcourons chacun.',
      note: 'Plantez le décor d’abord : « C’est le programme de transformation numérique de l’ASC — trois projets : migrer vers un nuage sécurisé, former le personnel à l’utiliser, et mettre hors service les anciens systèmes hérités. » Puis l’accroche : « Clarity PPM est un logiciel à accès restreint, sans version gratuite — je ne peux pas en faire de captures, alors j’ai reproduit sa logique décisionnelle à travers les trois outils nommés dans l’affiche. »',
      proves: 'Initiative · Outils de gestion de portefeuille de projets (exigé)' } },
  { target: 'bluf', tab: 'clarity',
    en: { title: 'Executive narrative (BLUF)', body: '“Bottom Line Up Front” — auto-generated from the live portfolio data, so the headline always matches what the numbers say.',
      note: 'Say BLUF is the executive-briefing convention — conclusion first, then the detail — standard in GoC reporting. Stress it’s auto-generated from live data, so the headline can never drift from the numbers.',
      proves: 'Digital & IT Project Management · General Communication' },
    fr: { title: 'Narratif exécutif (BLUF)', body: '« Conclusion en tête » — généré automatiquement à partir des données du portefeuille; le résumé reflète toujours les chiffres.',
      note: 'Dites que le BLUF est la convention de breffage exécutif — la conclusion d’abord, puis les détails — standard dans la reddition de comptes au GC. Insistez : il est généré automatiquement à partir des données en direct, donc le résumé ne peut jamais s’écarter des chiffres.',
      proves: 'Gestion de projets numériques et TI · Communication générale' } },
  { target: 'evm', tab: 'clarity',
    en: { title: 'Earned-value health matrix', body: 'RAG status with SPI (schedule) and CPI (cost) per project. Above 1.0 is favourable — Legacy is red at CPI 0.45.',
      note: 'Name the three projects so the numbers mean something: Cloud Migration (build the secure Azure cloud) is yellow — team over-allocated; Staff Training (get all 6 branches adopting it) is green — under budget; Legacy Decommission (retire the old systems) is red. Then the metrics: “SPI is schedule, CPI is cost; >1.0 favourable, <0.85 critical. Legacy is CPI 0.45 — 45¢ of value per dollar spent.” Flex: click a row to show its “what it is” + BAC/EV/PV/AC/EAC/VAC reconcile.',
      proves: 'Digital & IT Project Management · business acumen' },
    fr: { title: 'Matrice de santé — valeur acquise', body: 'Statut RAV avec IPS (calendrier) et ICP (coût) par projet. Au-dessus de 1,0 est favorable — l’Héritage est rouge à ICP 0,45.',
      note: 'Nommez les trois projets pour donner du sens aux chiffres : Migration Cloud (bâtir le nuage Azure sécurisé) est jaune — équipe surchargée; Formation (faire adopter par les 6 directions) est verte — sous budget; Décommissionnement Héritage (retirer les vieux systèmes) est rouge. Puis les mesures : « L’IPS, c’est le calendrier; l’ICP, le coût; >1,0 favorable, <0,85 critique. L’Héritage est à ICP 0,45 — 45 ¢ par dollar dépensé. » Atout : cliquez une ligne pour son « en bref » + BAC/VA/VP/CR/EAC/VAC.',
      proves: 'Gestion de projets numériques et TI · sens des affaires' } },
  { target: 'simulator', tab: 'clarity',
    en: { title: 'Scenario simulator', body: 'Toggle a mitigation — delay Phase 2 or approve a $150K contingency — and the whole dashboard, narrative, and risk statuses recompute live.',
      note: 'THE money moment — slow down: “As a PM I don’t just report red, I bring options.” Delay Phase 2 → April load 118%→95% (resource leveling, no new money). Approve $150K → Legacy CPI recovers toward 0.67. Frame it as the trade-off you’d put to an ADM.',
      proves: 'Advise & Negotiate · Complex Problem Solving' },
    fr: { title: 'Simulateur de scénarios', body: 'Activez une atténuation — retarder la Phase 2 ou approuver 150 k$ de contingence — et tout le tableau, le narratif et les risques se recalculent en direct.',
      note: 'LE moment clé — ralentissez : « Comme gestionnaire, je n’annonce pas seulement le rouge, j’apporte des options. » Retarder la Phase 2 → charge d’avril de 118 % à 95 % (nivellement des ressources, sans nouvel argent). Approuver 150 k$ → l’ICP de l’Héritage remonte vers 0,67. Présentez-le comme l’arbitrage que vous soumettriez à un SMA.',
      proves: 'Conseiller et négocier · Résolution de problèmes complexes' } },
  { target: 'risk-register', tab: 'clarity',
    en: { title: 'Risk register', body: 'Top program risks by probability × impact, each with a response and owner. The two linked to the simulator flip status when you model their mitigation.',
      note: 'RAID-style register — probability × impact exposure, a response, and a named owner. Point out the two risks that flip to Mitigated / Mitigating when you run the simulator. Tie the red project’s root cause to unresolved legacy data-mapping dependencies.',
      proves: 'Risk management · Thinking things through' },
    fr: { title: 'Registre des risques', body: 'Risques majeurs par probabilité × impact, avec réponse et responsable. Les deux liés au simulateur changent de statut quand on modélise leur atténuation.',
      note: 'Registre de type RAID — exposition probabilité × impact, une réponse et un responsable nommé. Montrez les deux risques qui passent à Atténué / En atténuation quand vous lancez le simulateur. Reliez la cause racine du projet rouge aux dépendances non résolues de mappage des données héritées.',
      proves: 'Gestion des risques · Réflexion approfondie' } },
  { target: 'gantt', tab: 'gantt',
    en: { title: 'Program schedule', body: 'Hybrid delivery — Waterfall milestones (diamonds) over Agile sprints. The red line is today; hover any bar for progress and owner.',
      note: 'Call it hybrid delivery — Waterfall milestone gates over Agile sprints, which mirrors how GoC IT programs actually run. Red line is today; the critical path runs through Legacy — the same problem child as the portfolio view. One consistent story across tools.',
      proves: 'IT PPM Tools (MS Project) · schedule & scope management' },
    fr: { title: 'Calendrier du programme', body: 'Livraison hybride — jalons Waterfall (losanges) sur des sprints Agile. La ligne rouge est aujourd’hui; survolez une barre pour l’avancement et le responsable.',
      note: 'Appelez-le livraison hybride — jalons Waterfall au-dessus de sprints Agile, ce qui reflète le fonctionnement réel des programmes TI au GC. La ligne rouge est aujourd’hui; le chemin critique passe par l’Héritage — le même problème que dans la vue portefeuille. Une seule histoire cohérente entre les outils.',
      proves: 'Outils de GPP (MS Project) · gestion du calendrier et de la portée' } },
  { target: 'board', tab: 'jira',
    en: { title: 'Sprint board', body: 'A live Agile board — drag cards between columns, with WIP limits that turn red when exceeded, epic filters, and story points.',
      note: 'Drag a card and put it back — proves it’s a live board, not a screenshot. WIP limits turn red over the cap (flow / overload signal). Open a backlog card: ITSG-33 security, Protected B data-retention, offline-sync for field researchers — these ARE requirements analysis, written as delivery-ready stories.',
      proves: 'IT PPM Tools (Jira) · Requirements Analysis' },
    fr: { title: 'Tableau de sprint', body: 'Un tableau Agile en direct — glissez les cartes entre colonnes, avec des limites de TEC qui rougissent si dépassées, des filtres d’épopée et des points.',
      note: 'Glissez une carte et remettez-la — ça prouve que le tableau est en direct, pas une capture. Les limites de TEC rougissent au-delà du plafond (signal de flux / surcharge). Ouvrez une carte du carnet : sécurité ITSG-33, conservation des données Protégé B, synchronisation hors-ligne pour les chercheurs sur le terrain — c’est de l’analyse des besoins, sous forme de récits prêts à livrer.',
      proves: 'Outils de GPP (Jira) · Analyse des besoins' } },
  { target: 'burndown', tab: 'jira',
    en: { title: 'Sprint burndown', body: 'Actual vs. ideal remaining points. This sprint is tracking above ideal — at risk — with a de-scope recommendation.',
      note: 'Actual is tracking 4–6 points above ideal — sprint-at-risk, with a de-scope recommendation. Use the Staff Digital Training workstream as your change-management evidence: adoption across all 6 branches via change champions and bilingual training.',
      proves: 'Change Management · delivery monitoring' },
    fr: { title: 'Graphique d’avancement', body: 'Réel vs. idéal des points restants. Ce sprint dépasse l’idéal — à risque — avec une recommandation de réduction de portée.',
      note: 'Le réel suit 4 à 6 points au-dessus de l’idéal — sprint à risque, avec une recommandation de réduction de portée. Utilisez le volet Formation numérique du personnel comme preuve de gestion du changement : adoption dans les 6 directions via des champions du changement et une formation bilingue.',
      proves: 'Gestion du changement · suivi de la livraison' } },
  { target: 'lang', tab: null,
    en: { title: 'Fully bilingual', body: 'The role is bilingual imperative — every view, label, and narrative switches between English and French right here. That’s the tour!',
      note: 'Don’t just mention it — do it. Hit FR, narrate one sentence of the current view in French, then switch back. The role is bilingual imperative (B B B). Tip: to deliver a French segment, toggle FR first, then run the tour — it follows the active language.',
      proves: 'Bilingual (B B B imperative)' },
    fr: { title: 'Entièrement bilingue', body: 'Le poste est bilingue impératif — chaque vue, étiquette et narratif bascule entre l’anglais et le français ici même. C’est la fin de la visite!',
      note: 'Ne faites pas que le mentionner — faites-le. Activez FR, narrez une phrase de la vue actuelle en français, puis revenez. Le poste est bilingue impératif (B B B). Astuce : pour livrer un segment en français, activez FR d’abord, puis lancez la visite — elle suit la langue active.',
      proves: 'Bilingue (B B B impératif)' } },
]

const UI = {
  en: { next: 'Next ›', back: 'Back', skip: 'Skip tour', done: 'Finish', step: (a, b) => `Step ${a} of ${b}`,
    presenter: 'Presenter notes', proves: 'Proves', hint: 'practice mode — hidden from the panel',
    firstHint: 'Rehearsing? Flip this on (or press N) for coaching notes on every step.' },
  fr: { next: 'Suivant ›', back: 'Précédent', skip: 'Passer', done: 'Terminer', step: (a, b) => `Étape ${a} sur ${b}`,
    presenter: 'Notes du présentateur', proves: 'Démontre', hint: 'mode pratique — caché du jury',
    firstHint: 'Vous répétez? Activez ceci (ou appuyez sur N) pour des notes de coaching à chaque étape.' },
}

export default function Tour({ open, onClose, activeTab, setActiveTab, lang = 'en' }) {
  const [i, setI] = useState(0)
  const [rect, setRect] = useState(null)
  const [tipH, setTipH] = useState(180)
  const [notes, setNotes] = useState(false) // presenter-notes toggle (off by default = clean for the panel)
  const tipRef = useRef(null)
  const timers = useRef([])
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const step = STEPS[i]
  const last = i === STEPS.length - 1
  const next = () => (last ? onClose() : setI(v => v + 1))
  const back = () => setI(v => Math.max(0, v - 1))

  // Reset to the first step whenever the tour opens.
  useEffect(() => { if (open) { setI(0); setRect(null) } }, [open])

  // Switch view if needed, scroll the target into view, then measure it.
  useEffect(() => {
    if (!open) return
    clearTimers()
    setRect(null)
    if (step.tab && step.tab !== activeTab) { setActiveTab(step.tab); return }
    let tries = 0
    const place = () => {
      const el = document.querySelector(`[data-tour="${step.target}"]`)
      if (!el) {
        if (tries++ < 40) timers.current.push(setTimeout(place, 50))
        return
      }
      // Instant scroll so the measurement below is taken against a settled layout.
      el.scrollIntoView({ block: 'center', behavior: 'auto' })
      timers.current.push(setTimeout(() => setRect(el.getBoundingClientRect()), 60))
    }
    place()
    return clearTimers
  }, [open, i, activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  // Measure the tooltip so it can be clamped fully on-screen. `notes` is a dep
  // because toggling presenter notes changes the tooltip height.
  useLayoutEffect(() => {
    if (open && tipRef.current) setTipH(tipRef.current.offsetHeight)
  }, [open, i, rect, lang, notes])

  // Keep the spotlight aligned on resize.
  useEffect(() => {
    if (!open) return
    const onResize = () => {
      const el = document.querySelector(`[data-tour="${step.target}"]`)
      if (el) setRect(el.getBoundingClientRect())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open, i]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard: Esc to skip, arrows to navigate, N to toggle presenter notes.
  useEffect(() => {
    if (!open) return
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') back()
      else if (e.key === 'n' || e.key === 'N') setNotes(v => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, i]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null

  const t = UI[lang] || UI.en
  const c = step[lang] || step.en

  // Pixel-positioned and clamped to the viewport so it can never run off-screen,
  // regardless of how tall the highlighted element is.
  let tipStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  if (rect) {
    const M = 16
    const left = Math.min(Math.max(rect.left, M), window.innerWidth - 340 - M)
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    let top
    if (spaceBelow >= tipH + 14 + M) top = rect.bottom + 14
    else if (spaceAbove >= tipH + 14 + M) top = rect.top - 14 - tipH
    else top = (window.innerHeight - tipH) / 2
    top = Math.max(M, Math.min(top, window.innerHeight - tipH - M))
    tipStyle = { top, left }
  }

  return (
    <>
      {/* Click blocker so background interactions don't fire mid-tour */}
      <div className="fixed inset-0 z-[60]" />

      {/* Spotlight: transparent box with a giant box-shadow that dims everything else */}
      {rect && (
        <div
          className="fixed z-[61] rounded-xl pointer-events-none transition-all duration-300"
          style={{
            top: rect.top - 6, left: rect.left - 6,
            width: rect.width + 12, height: rect.height + 12,
            boxShadow: '0 0 0 9999px rgba(2,6,23,0.78)',
            border: '2px solid #3b82f6',
          }}
        />
      )}

      {/* Tooltip */}
      <div ref={tipRef} className="fixed z-[62] w-[340px] max-h-[88vh] overflow-y-auto bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4" style={tipStyle}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-blue-400 font-medium">{t.step(i + 1, STEPS.length)}</span>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xs transition-colors">{t.skip} ✕</button>
        </div>
        <h3 className="text-sm font-semibold text-white mb-1">{c.title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-2.5">{c.body}</p>

        {/* First-step nudge so the presenter discovers the toggle during a live run */}
        {i === 0 && !notes && (
          <p className="mb-2 flex items-start gap-1 text-[11px] leading-snug text-amber-300/80">
            <span aria-hidden>🎤</span><span>{t.firstHint}</span>
          </p>
        )}

        {/* Presenter-notes toggle — off by default so the tour stays clean for a live panel */}
        <button
          onClick={() => setNotes(v => !v)}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-colors ${notes ? 'border-amber-500/50 bg-amber-500/10' : 'border-slate-700 bg-slate-900/60 hover:border-amber-500/40'}`}
          aria-pressed={notes}
        >
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-300/90">
            <span aria-hidden>🎤</span> {t.presenter}
          </span>
          <span className={`relative w-8 h-4 rounded-full transition-colors ${notes ? 'bg-amber-500' : 'bg-slate-600'}`}>
            <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${notes ? 'left-[18px]' : 'left-0.5'}`} />
          </span>
        </button>

        {/* Coaching block — what to SAY + the criterion it proves */}
        {notes && (
          <div className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/[0.07] p-2.5">
            <p className="text-[11px] leading-relaxed text-amber-100/90">{c.note}</p>
            {c.proves && (
              <p className="mt-1.5 pt-1.5 border-t border-amber-500/20 text-[10px] font-medium text-amber-300/80 flex items-start gap-1">
                <span aria-hidden>✓</span><span>{t.proves}: {c.proves}</span>
              </p>
            )}
            <p className="mt-1 text-[9px] uppercase tracking-wider text-amber-500/50">{t.hint}</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1">
            {STEPS.map((_, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === i ? 'bg-blue-500' : 'bg-slate-600'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            {i > 0 && <button onClick={back} className="px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">{t.back}</button>}
            <button onClick={next} className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">{last ? t.done : t.next}</button>
          </div>
        </div>
      </div>
    </>
  )
}
