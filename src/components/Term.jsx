import { useState, useRef, useEffect } from 'react'
import { GLOSSARY } from '../data/glossary'

// Inline acronym with a click-to-reveal definition / formula popover.
// Uses fixed positioning so it escapes any `overflow-hidden` table/card ancestor.
export default function Term({ k, lang = 'en', children, className = '' }) {
  const [pos, setPos] = useState(null) // null = closed
  const ref = useRef(null)
  const g = GLOSSARY[k]

  useEffect(() => {
    if (!pos) return
    const close = () => setPos(null)
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) close() }
    const onKey = e => { if (e.key === 'Escape') close() }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [pos])

  if (!g) return <>{children}</>
  const loc = g[lang] || g.en

  const toggle = e => {
    e.stopPropagation()
    if (pos) { setPos(null); return }
    const r = e.currentTarget.getBoundingClientRect()
    const W = 272
    const left = Math.max(12, Math.min(r.left, window.innerWidth - W - 12))
    const below = window.innerHeight - r.bottom > 180
    setPos({ left, top: below ? r.bottom + 6 : r.top - 6, below })
  }

  return (
    <span ref={ref} className="relative inline-block normal-case tracking-normal">
      <button
        type="button"
        onClick={toggle}
        className={`underline decoration-dotted decoration-slate-500 underline-offset-2 hover:decoration-blue-400 focus:outline-none transition-colors ${pos ? 'decoration-blue-400 text-blue-300' : ''} ${className}`}
        aria-label={`Define ${k}`}
      >
        {children}
      </button>
      {pos && (
        <span
          className="fixed z-[55] w-[272px] bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-3 text-left block font-normal"
          style={pos.below ? { left: pos.left, top: pos.top } : { left: pos.left, top: pos.top, transform: 'translateY(-100%)' }}
        >
          <span className="block text-xs font-semibold text-white">{g.term}</span>
          <span className="block text-xs text-slate-300 mt-1 leading-relaxed">{loc.def}</span>
          {loc.formula && (
            <span className="block mt-2 text-xs font-mono text-blue-300 bg-slate-950 rounded px-2 py-1.5">{loc.formula}</span>
          )}
        </span>
      )}
    </span>
  )
}
