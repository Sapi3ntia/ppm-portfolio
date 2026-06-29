# CSA Digital Transformation — IT Portfolio Dashboard

A bilingual (EN/FR) Project Portfolio Management (PPM) simulation built as a portfolio
artifact for a role in the federal public service. It
demonstrates working fluency across the three tool domains a federal IT PM is expected
to operate in — **executive portfolio governance (Clarity PPM)**, **schedule management
(MS Project / Gantt)**, and **Agile delivery (Jira)** — in a single, self-contained
React app.

The scenario is fictional: a *Canadian Space Agency Digital Transformation Initiative*
made up of three concurrent sub-projects — secure cloud migration, staff digital
training, and legacy system decommissioning. All data is mock data (`src/data/mockData.js`)
and representative of a Government of Canada IT program (ITSG-33, Protected B, GCKey
federation, Azure Government Cloud, bilingual delivery).

## Why this exists

Clarity PPM is a restricted enterprise tool with no free tier — an applicant can't
screenshot real work in it. This app reproduces its **core logic** instead: how
project-level data rolls up into portfolio-level executive decisions (capacity vs.
demand, RAG health, EVM, risk/ROI positioning, budget burn).

## Views

| View | Emulates | What it shows |
|------|----------|----------------|
| **Portfolio Overview** | Clarity PPM | RAG health matrix with EVM (SPI/CPI), resource capacity-vs-demand, risk/ROI scatter, budget burn KPIs, a BLUF executive narrative, a **risk register** (probability×impact exposure, response, owner), and a live **scenario simulator** (toggle mitigations and watch the dashboard — and the linked risk statuses — recompute). |
| **Program Schedule** | MS Project / Gantt | Milestone-driven schedule across three workstreams with progress, a "today" marker, and program-level rollup stats. |
| **Sprint Board** | Jira / Agile | Drag-and-drop board with WIP limits, epic filtering, sprint velocity, and an actual-vs-ideal burndown chart. |

All three views and the navigation are fully bilingual via the **EN/FR** toggle in the
sidebar. (Project, task, and personnel names remain in their original form across both
languages, mirroring real GoC tooling.)

A **Guided Tour** button in the sidebar runs an interactive, step-by-step walkthrough — it
spotlights each key area (BLUF, EVM matrix, scenario simulator, risk register, schedule,
sprint board, burndown), auto-switching views as it goes, in whichever language is active.
It's there so the app can present *itself* — no pointing required.

## Mapping to the IT-XX selection criteria

This artifact targets the CSA *IT-XX IT Analyst, IT Project Portfolio Management (Bilingual)*
process. Each required skill is demonstrated by a concrete, clickable feature:

| Selection-criteria skill | Where it shows in the app |
|---|---|
| **IT Project Portfolio Management Tools** *(required)* | The three views reproduce the exact tools named in the poster — Clarity PPM, MS Project, Jira. |
| **Digital & IT Project Management** *(required)* | Full-lifecycle monitoring/reporting: EVM, milestone schedule, sprint burndown, auto-generated BLUF narrative. |
| **Requirements Analysis** *(required)* | Sprint backlog captures security (ITSG-33), data-retention (Protected B), and offline-sync requirements as delivery-ready stories. |
| **Advise & Negotiate** *(required)* | Scenario Simulator + risk register model mitigations and a $150K contingency decision *for decision-makers* — recommendation, not just status. |
| **Change Management** *(required)* | Staff Digital Training workstream: change champions per branch, bilingual adoption across all 6 divisions. |
| **Bilingual (B B B imperative)** | Every view, label, and narrative switches live via the EN/FR toggle. |

The in-app **About this Dashboard** modal carries the same mapping (bilingual) for reviewers
who open the app directly.

## Tech stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for the charts
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) for drag-and-drop

## Getting started

```bash
npm install
npm run dev      # http://127.0.0.1:5173
```

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  App.jsx                      # tab shell + shared state (active tab, language, sprint data)
  main.jsx                     # React entry point
  index.css                    # Tailwind directives
  components/
    Nav.jsx                    # sidebar: tabs, EN/FR toggle, "Program Pulse" summary
    ClarityDashboard.jsx       # Portfolio Overview (Clarity PPM equivalent)
    GanttView.jsx              # Program Schedule (MS Project / Gantt equivalent)
    JiraBoard.jsx              # Sprint Board (Jira / Agile equivalent)
    AboutModal.jsx             # context / "about this dashboard" modal
  data/
    mockData.js                # all fictional portfolio, schedule, and sprint data
```

Each component carries its own inline `T = { en, fr }` translation dictionary; the active
`lang` is held in `App.jsx` and passed down to every view.

## Note

All figures, names, and projects are fictional and for demonstration only. This is not
affiliated with the Canadian Space Agency or any government body.
