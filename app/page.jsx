'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [time, setTime] = useState('')
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

  const activeAgents = agents.filter(a => a.status === 'active').length
  const busyAgents = agents.filter(a => a.status === 'busy').length
  const liveProjects = projects.filter(p => p.status === 'live').length

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo"><span className="d"></span> NEXUS</div>
        <nav className="nav">
          {[
            { ico: '\u25c9', label: 'Dashboard' },
            { ico: '\u25c6', label: 'Agents' },
            { ico: '\u25a3', label: 'Projects' },
            { ico: '\u25fb', label: 'Vault' },
            { ico: '\u2197', label: 'Deploy' },
            { ico: '\u25ce', label: 'Analytics' },
            { ico: '\u2699', label: 'Settings' },
          ].map(item => (
            <a key={item.label} href="#" className={item.label === 'Dashboard' ? 'active' : ''}>
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
        <div className="topbar">
          <h1>Dashboard</h1>
          <div className="time">{time} UTC</div>
        </div>

        {/* Stats row */}
        <div className="grid-4">
          <div className="card">
            <div className="label">Active Agents</div>
            <div className="value">{activeAgents}<span style={{fontSize:14,fontWeight:400,color:'#475569'}}>/{agents.length}</span></div>
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

        {/* Agents */}
        <div className="section-title">Agents</div>
        <div className="agent-grid">
          {agents.map(agent => (
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

        {/* Projects */}
        <div className="section-title">Projects</div>
        <table className="project-table">
          <thead><tr><th>Name</th><th>Status</th><th>URL</th><th>Updated</th></tr></thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td style={{fontWeight:600}}>{p.name}</td>
                <td><span className={`tag ${p.status}`}>{p.status}</span></td>
                <td style={{color:'#64748b',fontSize:11}}>{p.url}</td>
                <td style={{color:'#475569'}}>{p.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Quick Deploy */}
        <div className="section-title">Quick Actions</div>
        <div className="deploy-strip">
          <div className="d">
            <div style={{fontSize:10,color:'#475569',fontWeight:600,textTransform:'uppercase',letterSpacing:.06em,marginBottom:2}}>kdpbookinaweek</div>
            <div className="url">https://kdpbookinaweek.vercel.app</div>
          </div>
          <div className="d">
            <div style={{fontSize:10,color:'#475569',fontWeight:600,textTransform:'uppercase',letterSpacing:.06em,marginBottom:2}}>GitHub</div>
            <div className="url">myocjade511/kdpbookinaweek</div>
          </div>
        </div>

        {/* Logs */}
        <div className="section-title">Activity Log</div>
        <div className="log-box">
          {logs.map((log, i) => (
            <div key={i} className={`line ${log.level}`}>
              <span className="t">[{log.time}]</span>{' '}
              <span>{log.msg}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{textAlign:'center',padding:'20px 0 10px',fontSize:10,color:'#1e2a4a',letterSpacing:.04em}}>
          OpenClaw Nexus Dashboard v1.0.0 &middot; {new Date().toISOString().slice(0,10)}
        </div>
      </main>
    </div>
  )
}
