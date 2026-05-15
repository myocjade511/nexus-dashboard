'use client'

import { useState, useEffect } from 'react'

const AGENTS = [
  { id: '1', name: 'Sales Agent', status: 'active', project: 'AI Funnel', progress: 72 },
  { id: '2', name: 'Copywriter', status: 'active', project: 'Book in a Week', progress: 45 },
  { id: '3', name: 'VSL Producer', status: 'idle', project: '\u2014', progress: 0 },
  { id: '4', name: 'Social Poster', status: 'busy', project: 'Campaign #12', progress: 88 },
  { id: '5', name: 'Orchestrator (Max)', status: 'active', project: 'Multi-agent', progress: 100 },
  { id: '6', name: 'Ghostwriter', status: 'idle', project: 'Thriller Series', progress: 0 },
]

const PROJECTS = [
  { id: '1', name: 'kdpbookinaweek', status: 'live', url: 'kdpbookinaweek.vercel.app', updated: '2m ago' },
  { id: '2', name: 'Book in a Week Sales', status: 'build', url: '\u2014', updated: '15m ago' },
  { id: '3', name: 'Nexus Dashboard', status: 'build', url: '\u2014', updated: 'Just now' },
  { id: '4', name: 'Thriller Series', status: 'draft', url: '\u2014', updated: '2d ago' },
]

const LOGS = [
  { time: '14:20:01', level: 'ok', msg: 'Nexus Dashboard deployed' },
  { time: '14:19:30', level: 'info', msg: 'kdpbookinaweek push to main' },
  { time: '14:19:15', level: 'ok', msg: 'Vercel deployment completed' },
  { time: '14:15:00', level: 'warn', msg: 'STRIPE_KEY expired \u2014 action needed' },
  { time: '14:10:22', level: 'info', msg: 'New design batch committed' },
]

const NAV_ITEMS = [
  { key: 'dashboard', ico: '\u25c9', label: 'Dashboard' },
  { key: 'agents',    ico: '\u25c6', label: 'Agents' },
  { key: 'projects',  ico: '\u25a3', label: 'Projects' },
  { key: 'analytics', ico: '\u25ce', label: 'Analytics' },
  { key: 'deploy',    ico: '\u2197', label: 'Deploy' },
  { key: 'settings',  ico: '\u2699', label: 'Settings' },
]

export default function Dashboard() {
  const [time, setTime] = useState('')
  const [section, setSection] = useState('dashboard')
  const [agentFilter, setAgentFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  const [projectSort, setProjectSort] = useState('name')
  const [view, setView] = useState('grid')
  const [logFilter, setLogFilter] = useState('all')

  useEffect(() => {
    const t = new Date()
    setTime(t.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }))
  }, [])

  const filteredAgents = AGENTS.filter(a => agentFilter === 'all' || a.status === agentFilter)
  const filteredProjects = PROJECTS
    .filter(p => projectFilter === 'all' || p.status === projectFilter)
    .sort((a, b) => {
      if (projectSort === 'name') return a.name.localeCompare(b.name)
      if (projectSort === 'updated') return a.updated.localeCompare(b.updated)
      return 0
    })
  const filteredLogs = LOGS.filter(l => logFilter === 'all' || l.level === logFilter)
  const activeAgents = AGENTS.filter(a => a.status === 'active').length
  const busyAgents = AGENTS.filter(a => a.status === 'busy').length
  const liveProjects = PROJECTS.filter(p => p.status === 'live').length

  return (
    <div className="app">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="logo"><span className="d"></span> NEXUS</div>
        <nav className="nav">
          {NAV_ITEMS.map(item => (
            <a
              key={item.key}
              href="#"
              onClick={(e) => { e.preventDefault(); setSection(item.key) }}
              className={section === item.key ? 'active' : ''}
            >
              <span className="ico">{item.ico}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="status">
          <span className="d"></span>
          All systems nominal
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="main">

        {/* ── Top Action Bar ── */}
        <div className="topbar">
          <h1>{NAV_ITEMS.find(n => n.key === section)?.label || 'Dashboard'}</h1>
          <div className="top-actions">
            {(section === 'agents' || section === 'dashboard') && (
              <div className="filter-group">
                <button className={`fbtn ${agentFilter === 'all' ? 'on' : ''}`} onClick={() => setAgentFilter('all')}>All</button>
                <button className={`fbtn ${agentFilter === 'active' ? 'on' : ''}`} onClick={() => setAgentFilter('active')}>Active</button>
                <button className={`fbtn ${agentFilter === 'busy' ? 'on' : ''}`} onClick={() => setAgentFilter('busy')}>Busy</button>
                <button className={`fbtn ${agentFilter === 'idle' ? 'on' : ''}`} onClick={() => setAgentFilter('idle')}>Idle</button>
              </div>
            )}
            {section === 'projects' && (
              <>
                <div className="filter-group">
                  <button className={`fbtn ${projectFilter === 'all' ? 'on' : ''}`} onClick={() => setProjectFilter('all')}>All</button>
                  <button className={`fbtn ${projectFilter === 'live' ? 'on' : ''}`} onClick={() => setProjectFilter('live')}>Live</button>
                  <button className={`fbtn ${projectFilter === 'build' ? 'on' : ''}`} onClick={() => setProjectFilter('build')}>Build</button>
                  <button className={`fbtn ${projectFilter === 'draft' ? 'on' : ''}`} onClick={() => setProjectFilter('draft')}>Draft</button>
                </div>
                <div className="filter-group">
                  <button className={`fbtn ${projectSort === 'name' ? 'on' : ''}`} onClick={() => setProjectSort('name')}>Name \u2191</button>
                  <button className={`fbtn ${projectSort === 'updated' ? 'on' : ''}`} onClick={() => setProjectSort('updated')}>Recent</button>
                </div>
              </>
            )}
            {section === 'deploy' && (
              <div className="filter-group">
                <button className={`fbtn ${logFilter === 'all' ? 'on' : ''}`} onClick={() => setLogFilter('all')}>All</button>
                <button className={`fbtn ${logFilter === 'ok' ? 'on' : ''}`} onClick={() => setLogFilter('ok')}>Success</button>
                <button className={`fbtn ${logFilter === 'warn' ? 'on' : ''}`} onClick={() => setLogFilter('warn')}>Warnings</button>
                <button className={`fbtn ${logFilter === 'info' ? 'on' : ''}`} onClick={() => setLogFilter('info')}>Info</button>
              </div>
            )}
            {section === 'agents' && (
              <div className="filter-group">
                <button className={`fbtn ${view === 'grid' ? 'on' : ''}`} onClick={() => setView('grid')}>\u25a6 Grid</button>
                <button className={`fbtn ${view === 'list' ? 'on' : ''}`} onClick={() => setView('list')}>\u2261 List</button>
              </div>
            )}
            <div className="time">{time} UTC</div>
          </div>
        </div>

        {/* ── Dashboard ── */}
        {section === 'dashboard' && (
          <>
            <div className="grid-4">
              <div className="card"><div className="label">Active Agents</div><div className="value">{activeAgents}<span className="sub-value">/{AGENTS.length}</span></div><div className="sub">{busyAgents} busy</div></div>
              <div className="card"><div className="label">Live Projects</div><div className="value">{liveProjects}</div><div className="sub">{PROJECTS.length} total</div></div>
              <div className="card"><div className="label">Deployments</div><div className="value">12</div><div className="sub">This week</div></div>
              <div className="card"><div className="label">Pending Tasks</div><div className="value">3</div><div className="sub">Needs attention</div></div>
            </div>
            <div className="section-title">Agents</div>
            <div className="agent-grid">
              {filteredAgents.slice(0, 4).map(a => (
                <div key={a.id} className="agent-card">
                  <div className="h"><span className="name">{a.name}</span><span className={`status-badge ${a.status}`}>{a.status}</span></div>
                  <div className="project">{a.project}</div>
                  {a.progress > 0 && <div className="progress"><div className="fill" style={{width:a.progress+'%'}}></div></div>}
                </div>
              ))}
            </div>
            <div className="section-title">Projects</div>
            <table className="project-table">
              <thead><tr><th>Name</th><th>Status</th><th>URL</th><th>Updated</th></tr></thead>
              <tbody>
                {filteredProjects.slice(0, 3).map(p => (
                  <tr key={p.id}><td className="cell-bold">{p.name}</td><td><span className={`tag ${p.status}`}>{p.status}</span></td><td className="cell-dim">{p.url}</td><td className="cell-muted">{p.updated}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="section-title">Activity Log</div>
            <div className="log-box">
              {filteredLogs.slice(0, 4).map((l, i) => (
                <div key={i} className={`line ${l.level}`}><span className="t">[{l.time}]</span> <span>{l.msg}</span></div>
              ))}
            </div>
          </>
        )}

        {/* ── Agents ── */}
        {section === 'agents' && (
          <>
            {view === 'grid' ? (
              <div className="agent-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'12px'}}>
                {filteredAgents.map(a => (
                  <div key={a.id} className="agent-card">
                    <div className="h"><span className="name">{a.name}</span><span className={`status-badge ${a.status}`}>{a.status}</span></div>
                    <div className="project">Current: {a.project}</div>
                    {a.progress > 0 && <div className="progress"><div className="fill" style={{width:a.progress+'%'}}></div></div>}
                  </div>
                ))}
              </div>
            ) : (
              <table className="project-table">
                <thead><tr><th>Agent</th><th>Status</th><th>Project</th><th>Progress</th></tr></thead>
                <tbody>
                  {filteredAgents.map(a => (
                    <tr key={a.id}>
                      <td className="cell-bold">{a.name}</td>
                      <td><span className={`status-badge ${a.status}`}>{a.status}</span></td>
                      <td className="cell-dim">{a.project}</td>
                      <td className="cell-muted">{a.progress > 0 ? a.progress + '%' : '\u2014'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {/* ── Projects ── */}
        {section === 'projects' && (
          <>
            <div className="deploy-strip" style={{marginBottom:'16px'}}>
              <div className="d"><div className="label-sm">kdpbookinaweek</div><div className="url">https://kdpbookinaweek.vercel.app</div></div>
              <div className="d"><div className="label-sm">Nexus Dashboard</div><div className="url">https://nexus-dashboard.vercel.app</div></div>
            </div>
            <table className="project-table">
              <thead><tr><th>Name</th><th>Status</th><th>URL</th><th>Updated</th></tr></thead>
              <tbody>
                {filteredProjects.map(p => (
                  <tr key={p.id}><td className="cell-bold">{p.name}</td><td><span className={`tag ${p.status}`}>{p.status}</span></td><td className="cell-dim">{p.url}</td><td className="cell-muted">{p.updated}</td></tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ── Analytics ── */}
        {section === 'analytics' && (
          <>
            <div className="grid-4">
              <div className="card"><div className="label">Page Views</div><div className="value">2,847</div><div className="sub">This week</div></div>
              <div className="card"><div className="label">Conversions</div><div className="value">38</div><div className="sub">1.34% rate</div></div>
              <div className="card"><div className="label">Revenue</div><div className="value">$57K</div><div className="sub">MTD</div></div>
              <div className="card"><div className="label">Avg. Session</div><div className="value">4:12</div><div className="sub">+12% vs last week</div></div>
            </div>
            <div className="ph" style={{margin:'20px 0',height:'180px',maxWidth:'100%'}}><span>Chart placeholder \u2014 connect GA4 or Plausible</span></div>
          </>
        )}

        {/* ── Deploy ── */}
        {section === 'deploy' && (
          <>
            <div className="log-box" style={{marginBottom:'16px'}}>
              {filteredLogs.map((l, i) => (
                <div key={i} className={`line ${l.level}`}><span className="t">[{l.time}]</span> <span>{l.msg}</span></div>
              ))}
            </div>
            <div className="deploy-strip">
              <div className="d"><div className="label-sm">kdpbookinaweek</div><div className="url">https://github.com/myocjade511/kdpbookinaweek</div></div>
              <div className="d"><div className="label-sm">Nexus Dashboard</div><div className="url">https://github.com/myocjade511/nexus-dashboard</div></div>
            </div>
          </>
        )}

        {/* ── Settings ── */}
        {section === 'settings' && (
          <>
            <div className="deploy-strip" style={{flexDirection:'column',alignItems:'stretch'}}>
              <div className="d"><div className="label-sm">Stripe Key</div><div className="url" style={{color:'#ef4444'}}>Expired \u2014 needs update</div></div>
              <div className="d"><div className="label-sm">ElevenLabs Key</div><div className="url" style={{color:'#a8a29e'}}>Not configured</div></div>
              <div className="d"><div className="label-sm">GitHub</div><div className="url">myocjade511</div></div>
              <div className="d"><div className="label-sm">Vercel</div><div className="url">Team connected</div></div>
            </div>
          </>
        )}

        <div className="footer-note">
          OpenClaw Nexus Dashboard v1.0.2 &middot; {new Date().toISOString().slice(0,10)}
        </div>
      </main>
    </div>
  )
}
