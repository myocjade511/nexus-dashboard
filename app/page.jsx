'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [time, setTime] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [logs] = useState([
    { time: '14:20:01', level: 'ok', msg: 'Nexus Dashboard deployed' },
    { time: '14:19:30', level: 'info', msg: 'kdpbookinaweek push to main' },
    { time: '14:19:15', level: 'ok', msg: 'Vercel deployment completed' },
    { time: '14:15:00', level: 'warn', msg: 'STRIPE_KEY expired — action needed' },
    { time: '14:10:22', level: 'info', msg: 'New design batch committed' },
  ])

  const agents = [
    { id: '1', name: 'Sales Agent', status: 'active', project: 'AI Funnel', progress: 72 },
    { id: '2', name: 'Copywriter', status: 'active', project: 'Book in a Week', progress: 45 },
    { id: '3', name: 'VSL Producer', status: 'idle', project: '—', progress: 0 },
    { id: '4', name: 'Social Poster', status: 'busy', project: 'Campaign #12', progress: 88 },
    { id: '5', name: 'Orchestrator (Max)', status: 'active', project: 'Multi-agent', progress: 100 },
    { id: '6', name: 'Ghostwriter', status: 'idle', project: 'Thriller Series', progress: 0 },
  ]

  const projects = [
    { id: '1', name: 'kdpbookinaweek', status: 'live', url: 'kdpbookinaweek.vercel.app', updated: '2m ago' },
    { id: '2', name: 'Book in a Week Sales', status: 'build', url: '—', updated: '15m ago' },
    { id: '3', name: 'Nexus Dashboard', status: 'build', url: '—', updated: 'Just now' },
    { id: '4', name: 'Thriller Series', status: 'draft', url: '—', updated: '2d ago' },
  ]

  useEffect(() => {
    const t = new Date()
    setTime(t.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }))
  }, [])

  const navItems = [
    { key: 'dashboard', ico: '\u25c9', label: 'Dashboard' },
    { key: 'agents',    ico: '\u25c6', label: 'Agents' },
    { key: 'projects',  ico: '\u25a3', label: 'Projects' },
    { key: 'analytics', ico: '\u25ce', label: 'Analytics' },
    { key: 'deploy',    ico: '\u2197', label: 'Deploy' },
    { key: 'settings',  ico: '\u2699', label: 'Settings' },
  ]

  const activeAgents = agents.filter(a => a.status === 'active').length
  const busyAgents = agents.filter(a => a.status === 'busy').length
  const liveProjects = projects.filter(p => p.status === 'live').length

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo"><span className="d"></span> NEXUS</div>
        <nav className="nav">
          {navItems.map(item => (
            <a
              key={item.key}
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveSection(item.key) }}
              className={activeSection === item.key ? 'active' : ''}
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

      <main className="main">
        {activeSection === 'dashboard' && (
          <>
            <div className="topbar">
              <h1>Dashboard</h1>
              <div className="time">{time} UTC</div>
            </div>

            <div className="grid-4">
              <div className="card">
                <div className="label">Active Agents</div>
                <div className="value">{activeAgents}<span className="sub-value">/{agents.length}</span></div>
                <div className="sub">{busyAgents} busy</div>
              </div>
              <div className="card">
                <div className="label">Live Projects</div>
                <div className="value">{liveProjects}</div>
                <div className="sub">{projects.length} total</div>
              </div>
              <div className="card">
                <div className="label">Deployments</div>
                <div className="value">12</div>
                <div className="sub">This week</div>
              </div>
              <div className="card">
                <div className="label">Pending Tasks</div>
                <div className="value">3</div>
                <div className="sub">Needs attention</div>
              </div>
            </div>

            <div className="section-title">Agents</div>
            <div className="agent-grid">
              {agents.slice(0, 4).map(agent => (
                <div key={agent.id} className="agent-card">
                  <div className="h">
                    <span className="name">{agent.name}</span>
                    <span className={`status-badge ${agent.status}`}>{agent.status}</span>
                  </div>
                  <div className="project">{agent.project}</div>
                  {agent.progress > 0 && (
                    <div className="progress"><div className="fill" style={{width:agent.progress+'%'}}></div></div>
                  )}
                </div>
              ))}
            </div>

            <div className="section-title">Projects</div>
            <table className="project-table">
              <thead><tr><th>Name</th><th>Status</th><th>URL</th><th>Updated</th></tr></thead>
              <tbody>
                {projects.slice(0, 3).map(p => (
                  <tr key={p.id}>
                    <td className="cell-bold">{p.name}</td>
                    <td><span className={`tag ${p.status}`}>{p.status}</span></td>
                    <td className="cell-dim">{p.url}</td>
                    <td className="cell-muted">{p.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="section-title">Activity Log</div>
            <div className="log-box">
              {logs.slice(0, 4).map((log, i) => (
                <div key={i} className={`line ${log.level}`}>
                  <span className="t">[{log.time}]</span>{' '}
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === 'agents' && (
          <>
            <div className="topbar"><h1>All Agents</h1><div className="time">{time} UTC</div></div>
            <div className="agent-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'12px'}}>
              {agents.map(agent => (
                <div key={agent.id} className="agent-card">
                  <div className="h">
                    <span className="name">{agent.name}</span>
                    <span className={`status-badge ${agent.status}`}>{agent.status}</span>
                  </div>
                  <div className="project">Current: {agent.project}</div>
                  {agent.progress > 0 && (
                    <div className="progress"><div className="fill" style={{width:agent.progress+'%'}}></div></div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === 'projects' && (
          <>
            <div className="topbar"><h1>All Projects</h1><div className="time">{time} UTC</div></div>
            <div className="deploy-strip" style={{marginBottom:'16px'}}>
              <div className="d">
                <div className="label-sm">kdpbookinaweek</div>
                <div className="url">https://kdpbookinaweek.vercel.app</div>
              </div>
              <div className="d">
                <div className="label-sm">Nexus Dashboard</div>
                <div className="url">https://nexus-dashboard.vercel.app</div>
              </div>
            </div>
            <table className="project-table">
              <thead><tr><th>Name</th><th>Status</th><th>URL</th><th>Updated</th></tr></thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id}>
                    <td className="cell-bold">{p.name}</td>
                    <td><span className={`tag ${p.status}`}>{p.status}</span></td>
                    <td className="cell-dim">{p.url}</td>
                    <td className="cell-muted">{p.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeSection === 'analytics' && (
          <><div className="topbar"><h1>Analytics</h1><div className="time">{time} UTC</div></div>
          <div className="grid-4">
            <div className="card"><div className="label">Page Views</div><div className="value">2,847</div><div className="sub">This week</div></div>
            <div className="card"><div className="label">Conversions</div><div className="value">38</div><div className="sub">1.34% rate</div></div>
            <div className="card"><div className="label">Revenue</div><div className="value">$57K</div><div className="sub">MTD</div></div>
            <div className="card"><div className="label">Avg. Session</div><div className="value">4:12</div><div className="sub">+12% vs last week</div></div>
          </div>
          <div className="ph" style={{margin:'20px 0',height:'180px',maxWidth:'100%'}}>
            <span>Chart placeholder — connect GA4 or Plausible</span>
          </div></>
        )}

        {activeSection === 'deploy' && (
          <><div className="topbar"><h1>Deploy</h1><div className="time">{time} UTC</div></div>
          <div className="log-box" style={{marginBottom:'16px'}}>
            {logs.map((log, i) => (
              <div key={i} className={`line ${log.level}`}>
                <span className="t">[{log.time}]</span> <span>{log.msg}</span>
              </div>
            ))}
          </div>
          <div className="deploy-strip">
            <div className="d">
              <div className="label-sm">kdpbookinaweek</div>
              <div className="url">https://github.com/myocjade511/kdpbookinaweek</div>
            </div>
            <div className="d">
              <div className="label-sm">Nexus Dashboard</div>
              <div className="url">https://github.com/myocjade511/nexus-dashboard</div>
            </div>
          </div></>
        )}

        {activeSection === 'settings' && (
          <><div className="topbar"><h1>Settings</h1><div className="time">{time} UTC</div></div>
          <div className="deploy-strip" style={{flexDirection:'column',alignItems:'stretch'}}>
            <div className="d"><div className="label-sm">Stripe Key</div><div className="url" style={{color:'#ef4444'}}>Expired — needs update</div></div>
            <div className="d"><div className="label-sm">ElevenLabs Key</div><div className="url" style={{color:'#a8a29e'}}>Not configured</div></div>
            <div className="d"><div className="label-sm">GitHub</div><div className="url">myocjade511</div></div>
            <div className="d"><div className="label-sm">Vercel</div><div className="url">Team connected</div></div>
          </div></>
        )}

        <div className="footer-note">
          OpenClaw Nexus Dashboard v1.0.0 &middot; {new Date().toISOString().slice(0,10)}
        </div>
      </main>
    </div>
  )
}
