# Presenter Notes — CSA IT Portfolio Dashboard

**Purpose:** what to *say* and *click* when you walk a panel through this app, mapped to the
IT-02 IT Analyst, Project Portfolio Management (Bilingual) selection criteria.

> These are talking points to internalize — **not a script to read aloud.** Reading it
> verbatim sounds robotic; the panel is assessing *General Communication* and *Advise &
> Negotiate*, so speak to them, click as you go, and pause for questions.

---

## The scenario in plain words (know this cold before anything else)

If you can't explain *what the projects are*, the metrics are just noise. Internalize this:

**The program:** the **CSA Digital Transformation Initiative** — modernizing how the agency
works by moving off aging on-premise systems to a secure cloud, getting staff to actually use
the new tools, and retiring the old systems. One program, three interdependent projects:

| # | Project | What it actually is | Health | Why |
|---|---|---|---|---|
| 1 | **Cloud Migration** (M. Tremblay) | Stand up CSA's **secure Azure Government Cloud** — ITSG-33 assessed, GCKey sign-on, Protected B — then migrate branch data onto it. | 🟡 Yellow | Work is sound, but the team hits **118% in April** — over-allocated, so schedule/cost slip (SPI 0.82 / CPI 0.79). |
| 2 | **Staff Digital Training** (J. Bouchard) | Get **all 6 branches** to adopt the new digital tools — bilingual EN/FR training, a **change champion** per division. | 🟢 Green | On track, **under budget (CPI 1.24)** — delivering value. Your change-management example. |
| 3 | **Legacy Decommission** (S. Park) | Safely **retire the old legacy systems** — inventory & migrate the old data, run new + old in **parallel**, then shut the legacy platform down. | 🔴 Red | The problem child: unresolved **legacy data-mapping dependencies** blew cost (**CPI 0.45** = 45¢ value per $1) and schedule (SPI 0.72); still in Planning. |

**The throughline that ties it together (say this if asked how they relate):**
> They're sequential. You can't shut down the legacy system (#3) until Cloud Migration (#1)
> has moved its data and Staff Training (#2) has people working in the new tool. That's why
> **Legacy is the critical path**, and why the two simulator levers are the real decisions:
> *delay Cloud Phase 2* to free up the over-allocated team, or *fund contractors* to unblock
> Legacy's data-mapping. One slips the schedule, the other spends $150K — that's the trade-off.

> In the app, **click any project row in the EVM table** to expand a plain-language
> "What it is" line plus the full earned-value breakdown — handy if the panel asks.

---

## 0. Before you start (2-minute setup)

- Run `npm run dev`, open `http://127.0.0.1:5173`, **full-screen the browser**, zoom so text is readable.
- Start on **Portfolio Overview**, language **EN**, all simulator toggles **off**.
- Have the **EN/FR toggle** in mind — you may be asked to switch mid-demo (bilingual imperative).
- Keep the **About this Dashboard** modal (bottom of sidebar) as a fallback — it lists the
  criteria-to-feature mapping if you blank.

### Two ways to drive the demo

- **Hands-free — the Guided Tour (recommended).** Click **Guided Tour** in the sidebar. It
  spotlights each area in order, auto-switches views, and advances on **Next** (or → / ←;
  Esc to exit). You don't point at anything — you just *talk to each highlight* using the
  per-view scripts below. It runs in whichever language is active, so for a French segment,
  toggle **FR** first, then start the tour.
  - **Practice mode — the 🎤 Presenter-notes toggle (inside the tour).** Each tour tooltip
    has a **Presenter notes** switch (or press **N**). **Off** = only the clean caption the
    panel sees. **On** = adds your coaching for that step — what to *say*, the exact numbers,
    and the **selection criterion it proves** (e.g. *Advise & Negotiate*, *Requirements
    Analysis*, *Bilingual B B B*). Rehearse with it **on**; it defaults **off** on every fresh
    load, so it stays clean for the real thing — but glance at the screen before you present
    to confirm it's off.
- **Manual** — click through yourself using sections 2–5. Use this if the panel wants to
  steer (e.g. "show me the red project first").

> The tour tells them *where to look*; you still supply the *why*. Run the tour and narrate
> over it — that combination is your General Communication evidence.

### Cheat-sheet — the numbers, so you never fumble them
| Fact | Value | Why it matters |
|---|---|---|
| Portfolio budget / spent / burn | $1.71M / $800K / **47%** | Q2, on plan overall |
| Team peak load (April) | **118%** | over-allocated → needs leveling |
| Legacy Decommission | RED — **SPI 0.72 / CPI 0.45** | the problem child; data-mapping dependencies |
| Cloud Migration | YELLOW — SPI 0.82 / CPI 0.79 | capacity-driven risk |
| Staff Training | GREEN — SPI 0.95 / **CPI 1.24** | under budget, delivering value |
| Sprint 3 | Day 8 of 11, ~4–6 pts behind ideal | tracking-at-risk burndown |

**One-liner if you only get 30 seconds:**
> "Clarity PPM is restricted enterprise software I can't screenshot, so I rebuilt its core
> logic — how project data rolls up into portfolio decisions — across the three tools the
> poster names: Clarity, MS Project, and Jira. Fully bilingual, and the earned-value numbers
> actually reconcile. Want me to walk through how I'd handle the red project?"

---

## 1. Opening (30 seconds)

- "This is a Project Portfolio Management simulation I built as a portfolio piece for this
  exact role. It demonstrates the three tools named in the criteria — **Clarity PPM, MS
  Project, and Jira** — in one bilingual app."
- "Clarity is restricted and has no free tier, so instead of a screenshot I **reproduced its
  decision logic**: how project-level data rolls up to executive portfolio governance."
- "Everything is fictional CSA data — a Digital Transformation program with three concurrent
  sub-projects: cloud migration, staff training, and legacy decommissioning."

➡ *Proves: initiative; IT Project Portfolio Management Tools; communication.*

---

## 2. Portfolio Overview — "the Clarity view" (the centrepiece, ~2 min)

**Click through, top to bottom:**

1. **BLUF narrative** — "Bottom Line Up Front — the executive-briefing convention. This is
   auto-generated from the live data, so the headline matches reality: budget remaining,
   what's critical, what's on track."
2. **Health Matrix (EVM table)** — "This is earned-value management. **SPI** is schedule
   performance, **CPI** is cost performance — above 1.0 is favourable, below 0.85 is
   critical. Legacy Decommission is red at CPI 0.45 — for every dollar spent we're getting
   45 cents of value." *(Optional flex: "These reconcile — CPI is earned value over actual
   cost; 18% of a $540K budget over $215K spent is 0.45.")*
3. **KPIs** — budget burn, projects at risk, peak team load 118%.
4. **Capacity vs. Demand chart** — "The team hits **118% in April** — over-allocated. That's
   a resource-leveling decision waiting to happen."
5. **Risk / ROI scatter** — "Portfolio positioning. Ideal is upper-left: low risk, high
   return. Legacy sits bottom-right — high risk, lower ROI."
6. **Risk Register** — "Top program risks with probability × impact exposure, a response,
   and an owner. Note two of them say *modelled in Scenario Simulator* — I'll show that now."

➡ *Proves: Digital & IT Project Management; Thinking things through; business acumen.*

### THE money moment — Scenario Simulator + Risk Register (do this slowly)

> This is your *Advise & Negotiate* and *Complex Problem Solving* evidence. Narrate the
> decision, not the UI.

- "As a PM I don't just report red — I bring options to decision-makers. Watch."
- **Toggle "Delay Cloud Migration Phase 2 by 4 weeks."** → "April load drops from 118% to
  95%, the capacity risk flips to **Mitigated**, and the BLUF rewrites itself. That's
  resource leveling, modelled live."
- **Toggle "Approve $150K Contingency Fund."** → "Legacy's CPI recovers toward 0.67, its risk
  moves to **Mitigating**. So the trade-off I'd put to an ADM is: 4-week slip *or* $150K of
  contractor contingency — here's what each buys."
- Toggle both off again to reset.

➡ *Proves: Advise & Negotiate; Complex Problem Solving; Initiative.*

---

## 3. Program Schedule — "the MS Project view" (~45 sec)

- "Milestone-driven Gantt across the three workstreams — **hybrid delivery**: Waterfall
  milestones with Agile sprints underneath, which is the reality in GoC IT."
- Point to the **red 'today' line** (Mar 17) and the **diamond milestones** (Cloud Env Ready,
  Legacy Shutdown). Hover a bar to show progress + owner.
- "Critical path runs through Legacy — the workstream already flagged red on the portfolio
  view. The tools tell one consistent story."

➡ *Proves: PPM Tools (MS Project); schedule/time/scope management.*

---

## 4. Sprint Board — "the Jira view" (~45 sec)

- "Live Agile board — **drag a card** between columns to show it's real, not a screenshot."
  *(Drag one card, then put it back.)*
- "**WIP limits** per column — In Progress turns red if you exceed 3. **Epic filter**,
  story points, velocity, and a **burndown** showing actual tracking 4–6 points above ideal
  — sprint-at-risk, with a de-scope recommendation."
- **Requirements Analysis hook:** open a backlog card — "These backlog items *are*
  requirements analysis: ITSG-33 security requirements, data-retention under Protected B,
  offline-sync for field researchers — captured as delivery-ready stories."

➡ *Proves: PPM Tools (Jira); Requirements Analysis; Change Management (Training epic).*

---

## 5. Bilingual demo (15 sec — do it, don't just mention it)

- "The role is bilingual imperative, so the whole app is." **Hit the FR toggle.** "Every
  view, label, and the executive narrative switch to French live." Narrate one sentence of
  the current view in French, then switch back if presenting in English.

➡ *Proves: Bilingual (B B B).*

---

## 6. Close (30 seconds)

- "So in one artifact: the three named PPM tools, full project lifecycle from sprint to
  executive governance, earned-value that reconciles, a risk register tied to a live
  decision simulator, and it's bilingual."
- "I built it myself — React, Vite, Tailwind — which is the same initiative and analytical
  thinking I'd bring to coordinating CSA's digital transformation projects."
- "Happy to dig into any view, or talk through how I'd handle the red project."

---

## Anticipated Q&A (rehearse these — most likely first)

**"Is this real data / a real Clarity system?"**
> No — fictional mock data. Clarity is restricted with no free tier, so rather than fake a
> screenshot I rebuilt its *core logic* to show I understand how portfolio rollup and
> earned-value actually work, not just where the buttons are.

**"Why does it say today is March 2025?"**
> It's a deliberate fixed snapshot so every view tells one coherent mid-program story —
> sprint day 8, the April capacity crunch still ahead, Legacy already red. The point is the
> decision logic; the date is just the anchor. Easy to rebase.

**"Did you build this yourself? What's the stack?"**
> Yes — React 18 + Vite, Tailwind for styling, Recharts for the charts, ~1,000 lines. I
> designed the data model so the EVM math reconciles rather than using random numbers.

**"What do SPI and CPI mean?"**
> Schedule and Cost Performance Index. SPI = earned value ÷ planned value; CPI = earned
> value ÷ actual cost. Above 1.0 is ahead/under budget; below 0.85 I treat as critical.

**"Walk me through how you'd manage the red project."**
> Root cause is unresolved legacy data-mapping dependencies (it's in the risk register).
> Escalate to the ADM with options, not just a red light: contingency fund to add
> contractor capacity, de-scope the parallel run, or slip the shutdown milestone. The
> simulator models the contingency-fund path — CPI recovers toward 0.67.

**"How would you handle the over-allocated team?"**
> Resource leveling. The simulator shows delaying Cloud Phase 2 by four weeks pulls April
> from 118% to 95% without adding budget — that's the cheapest mitigation, so I'd table it
> first.

**"Give me a requirements-analysis example."**
> The sprint backlog: 'Define cloud storage security requirements (ITSG-33 alignment)',
> 'Document data retention policies per Protected B classification', 'Draft offline-sync
> requirements for remote field researchers' — each is an elicited need written as a
> delivery-ready story an authority can sign off.

**"What project methodology is this?"**
> Hybrid. Waterfall milestones on the Gantt for governance gates, Agile sprints in Jira for
> delivery, both rolling up to Clarity-style executive governance — which mirrors how GoC IT
> programs actually run.

**"Can you present this in French?"**
> *(Switch to FR and narrate one view.)* Yes — the whole app and I both operate in both
> official languages.

**"What GoC standards does it reflect?"**
> ITSG-33 security control profiles, Protected B data classification, GCKey federated
> authentication, and Azure Government Cloud — woven through the schedule and backlog.

**"How would this scale to a real portfolio?"**
> The data model is separated from the views (`mockData.js`), so swapping mock data for a
> Clarity/Jira API feed is the natural next step — same rollup logic, real inputs.

---

## Bilingual delivery — French quick-reference

Keep these ready in case the panel asks you to present a segment in French.

- **Opener:** « C'est une simulation de gestion de portefeuille de projets que j'ai conçue
  pour ce poste. Elle démontre les trois outils nommés dans les critères — Clarity PPM, MS
  Project et Jira — dans une seule application bilingue. »
- **Portfolio Overview:** « La vue de gouvernance exécutive : santé RAV, valeur acquise
  IPS/ICP, capacité contre demande, registre des risques, et un simulateur de scénarios. »
- **Program Schedule:** « Le calendrier du programme — livraison hybride : jalons Waterfall
  et sprints Agile. »
- **Sprint Board:** « Le tableau de sprint Agile — limites de TEC, points d'histoire,
  vélocité, et graphique d'avancement. »
- **The decision moment:** « Comme gestionnaire, je n'annonce pas seulement le rouge —
  j'apporte des options aux décideurs : un report de 4 semaines, ou 150 k$ de contingence. »
- **Close:** « En un seul artefact : les trois outils, le cycle de vie complet, une valeur
  acquise cohérente, et c'est bilingue. Je l'ai construit moi-même. »

*Glossary:* EVM = GVA (gestion de la valeur acquise) · SPI = IPS · CPI = ICP ·
RAG = RAV (rouge-ambre-vert) · WIP = TEC (travail en cours) · BLUF = conclusion en tête.
