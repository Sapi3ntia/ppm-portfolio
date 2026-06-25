import { useState } from 'react'
import Nav from './components/Nav'
import ClarityDashboard from './components/ClarityDashboard'
import GanttView from './components/GanttView'
import JiraBoard from './components/JiraBoard'
import AboutModal from './components/AboutModal'
import Tour from './components/Tour'
import { initialSprintData } from './data/mockData'

export default function App() {
  const [activeTab, setActiveTab]   = useState('clarity')
  const [showAbout, setShowAbout]   = useState(false)
  const [tourOpen, setTourOpen]     = useState(false)
  const [sprintData, setSprintData] = useState(initialSprintData)
  const [lang, setLang]             = useState('en')

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      <Nav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAbout={() => setShowAbout(true)}
        onTour={() => setTourOpen(true)}
        lang={lang}
        setLang={setLang}
      />
      <main className="flex-1 overflow-y-auto bg-slate-900">
        {activeTab === 'clarity' && <ClarityDashboard lang={lang} />}
        {activeTab === 'gantt'   && <GanttView lang={lang} />}
        {activeTab === 'jira'    && <JiraBoard sprintData={sprintData} setSprintData={setSprintData} lang={lang} />}
      </main>
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} lang={lang} />}
      <Tour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
      />
    </div>
  )
}
