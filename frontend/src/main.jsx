import React, {useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {LayoutDashboard, ClipboardList, CalendarDays, Plus, LogOut, Video, Phone, MessageSquare, RefreshCw, Users, CheckCircle2, Clock3, AlertCircle} from 'lucide-react'
import './styles.css'

const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const demoUsers = {
  employer: {email:'employer@salarite.demo', password:'demo123'},
  virtual_hr: {email:'hr@salarite.demo', password:'demo123'}
}

async function api(path, options = {}) {
  const url = `${API}${path}`
  let res
  try {
    res = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    })
  } catch (networkError) {
    throw new Error(`Cannot connect to the API. Start the FastAPI server on port 8000. (${networkError.message})`)
  }

  const text = await res.text()
  let data = {}
  try { data = text ? JSON.parse(text) : {} } catch { data = { detail: text || 'Invalid server response' } }
  if (!res.ok) throw new Error(data.detail || `Request failed (${res.status})`)
  return data
}

function Login({onLogin}) {
  const [role,setRole]=useState('employer'), [loading,setLoading]=useState(false), [error,setError]=useState('')
  async function submit(e){
    e.preventDefault(); setLoading(true); setError('')
    try { const u=await api('/api/auth/login',{method:'POST',body:JSON.stringify(demoUsers[role])}); onLogin(u) }
    catch(err){setError(err.message)} finally{setLoading(false)}
  }
  return <div className="login-shell"><div className="login-card">
    <div className="brand large"><span>SV</span><div><b>Salarite</b><small>Virtual HR · ATS</small></div></div>
    <h1>Welcome back</h1><p className="muted">Sign in to your HR workspace</p>
    <div className="role-tabs"><button className={role==='employer'?'active':''} onClick={()=>setRole('employer')}>Employer</button><button className={role==='virtual_hr'?'active':''} onClick={()=>setRole('virtual_hr')}>Virtual HR</button></div>
    <form onSubmit={submit}><label>Email</label><input value={demoUsers[role].email} readOnly/><label>Password</label><input value={demoUsers[role].password} readOnly type="password"/>{error&&<div className="error">{error}</div>}<button className="primary full">{loading?'Signing in…':'Enter Dashboard'}</button></form>
    <div className="demo-note">Demo account · Ready for interviewer walkthrough</div>
  </div></div>
}

function Stat({icon,title,value,sub}){return <div className="stat"><div className="stat-icon">{icon}</div><div><small>{title}</small><strong>{value}</strong><span>{sub}</span></div></div>}

function App(){
 const [user,setUser]=useState(null)
 const [tab,setTab]=useState('overview')
 const [tasks,setTasks]=useState([]), [interviews,setInterviews]=useState([]), [dash,setDash]=useState({})
 const [users,setUsers]=useState([]), [showTask,setShowTask]=useState(false), [showInterview,setShowInterview]=useState(false)
 const [toast,setToast]=useState('')
 async function load(){
   try{const [t,i,d,u]=await Promise.all([api('/api/tasks'),api('/api/interviews'),api('/api/dashboard'),api('/api/users')]);setTasks(t);setInterviews(i);setDash(d);setUsers(u)}catch(e){setToast(e.message)}
 }
 useEffect(()=>{if(user){load();const timer=setInterval(load,5000);return()=>clearInterval(timer)}},[user])
 if(!user)return <Login onLogin={setUser}/>
 const isEmployer=user.role==='employer'
 return <div className="app">
   <aside><div className="brand"><span>SV</span><div><b>Salarite</b><small>Virtual HR</small></div></div>
   <nav>{[['overview','Overview',<LayoutDashboard/>],['tasks','Tasks',<ClipboardList/>],['interviews','Interviews',<CalendarDays/>]].map(([id,label,icon])=><button className={tab===id?'nav-active':''} onClick={()=>setTab(id)} key={id}>{icon}{label}</button>)}</nav>
   <div className="side-bottom"><div className="user-mini"><div className="avatar">{user.name[0]}</div><div><b>{user.name}</b><small>{isEmployer?'Employer':'Virtual HR'}</small></div></div><button className="logout" onClick={()=>setUser(null)}><LogOut/> Sign out</button></div></aside>
   <main><header><div><div className="eyebrow">SALARITE · ATS WORKSPACE</div><h1>{tab==='overview'?'Good afternoon, '+user.name.split(' ')[0]:tab==='tasks'?'Task Management':'Interview Scheduling'}</h1></div><div className="header-actions"><span className="live"><i/> Live sync · 5s</span><button className="icon-btn" onClick={load}><RefreshCw/></button>{isEmployer&&<button className="primary" onClick={()=>setShowTask(true)}><Plus/> Assign Task</button>}</div></header>
   {toast&&<div className="toast">{toast}<button onClick={()=>setToast('')}>×</button></div>}
   {tab==='overview'&&<Overview dash={dash} tasks={tasks} interviews={interviews} isEmployer={isEmployer} setTab={setTab}/>}
   {tab==='tasks'&&<Tasks tasks={tasks} users={users} isEmployer={isEmployer} onReload={load} openCreate={()=>setShowTask(true)} />}
   {tab==='interviews'&&<Interviews interviews={interviews} isEmployer={isEmployer} openCreate={()=>setShowInterview(true)} onReload={load}/>}
   </main>
   {showTask&&<TaskModal users={users} onClose={()=>setShowTask(false)} onDone={()=>{setShowTask(false);load()}}/>}
   {showInterview&&<InterviewModal onClose={()=>setShowInterview(false)} onDone={()=>{setShowInterview(false);load()}}/>}
 </div>
}

function Overview({dash,tasks,interviews,isEmployer,setTab}){
 return <section>
  <div className="stats"><Stat icon={<ClipboardList/>} title="Total tasks" value={dash.total||0} sub="Across workspace"/><Stat icon={<Clock3/>} title="In progress" value={dash.in_progress||0} sub="Being handled"/><Stat icon={<CheckCircle2/>} title="Completed" value={dash.completed||0} sub="Successfully closed"/><Stat icon={<CalendarDays/>} title="Interviews" value={dash.interviews||0} sub="Scheduled"/></div>
  <div className="grid-2"><div className="panel"><div className="panel-head"><div><h2>Live task activity</h2><p>Changes from Virtual HR appear automatically.</p></div><button className="text-btn" onClick={()=>setTab('tasks')}>View all →</button></div>{tasks.slice(0,4).map(t=><TaskRow key={t.id} t={t}/>)}</div>
  <div className="panel"><div className="panel-head"><div><h2>Upcoming interviews</h2><p>Next scheduled candidate sessions.</p></div><button className="text-btn" onClick={()=>setTab('interviews')}>Calendar →</button></div>{interviews.slice(0,4).map(i=><InterviewRow key={i.id} i={i}/>)}</div></div>
  <div className="workflow"><div><span>01</span><b>Assign</b><small>Employer creates a task</small></div><div className="arrow">→</div><div><span>02</span><b>Execute</b><small>Virtual HR updates progress</small></div><div className="arrow">→</div><div><span>03</span><b>Monitor</b><small>Employer sees live status</small></div><div className="arrow">→</div><div><span>04</span><b>Interview</b><small>Schedule Voice / Video / Chat</small></div></div>
 </section>
}

function TaskRow({t}){return <div className="task-row"><div className="task-main"><b>{t.title}</b><small>{t.description||'No description'}</small></div><div className="progress-wrap"><div className="progress"><i style={{width:t.progress+'%'}}/></div><span>{t.progress}%</span></div><Status status={t.status}/><span className={'priority '+t.priority.toLowerCase()}>{t.priority}</span></div>}
function Status({status}){return <span className={'status '+status.toLowerCase().replace(' ','-')}><i/>{status}</span>}
function InterviewRow({i}){return <div className="interview-row"><div className="candidate-avatar">{i.candidate_name[0]}</div><div className="task-main"><b>{i.candidate_name}</b><small>{i.position}</small></div><span className={'mode '+i.mode.toLowerCase()}>{i.mode}</span><b className="date">{i.scheduled_at.replace('T',' ')}</b></div>}

function Tasks({tasks,users,isEmployer,onReload,openCreate}){
 const [editing,setEditing]=useState(null)
 async function update(t,status,progress){try{await api('/api/tasks/'+t.id,{method:'PATCH',body:JSON.stringify({status,progress})});onReload()}catch(e){alert(e.message)}}
 return <section><div className="page-toolbar"><div><h2>Task management</h2><p>Assign, execute and monitor HR operations.</p></div>{isEmployer&&<button className="primary" onClick={openCreate}><Plus/> Assign task</button>}</div>
 <div className="panel table-panel"><div className="table-head"><span>Task</span><span>Priority</span><span>Progress</span><span>Status</span><span>Due</span><span>Action</span></div>{tasks.map(t=><div className="table-row" key={t.id}><div><b>{t.title}</b><small>{t.description}</small></div><span className={'priority '+t.priority.toLowerCase()}>{t.priority}</span><div className="progress-cell"><div className="progress"><i style={{width:t.progress+'%'}}/></div>{t.progress}%</div><Status status={t.status}/><span>{t.due_date||'—'}</span>{!isEmployer?<div className="action-group"><select value={t.status} onChange={e=>{let s=e.target.value,p=s==='Completed'?100:s==='Pending'?0:t.progress;update(t,s,p)}}><option>Pending</option><option>In Progress</option><option>Completed</option><option>Blocked</option></select><input type="range" min="0" max="100" value={t.progress} onChange={e=>update(t,'In Progress',Number(e.target.value))}/></div>:<span className="assigned">Virtual HR</span>}</div>)}</div></section>
}

function Interviews({interviews,isEmployer,openCreate,onReload}){
 async function call(i,mode){try{const r=await api('/api/interviews/'+i.id+'/call',{method:'POST',body:JSON.stringify({mode})});alert(r.message)}catch(e){alert(e.message)}}
 return <section><div className="page-toolbar"><div><h2>Interview scheduling</h2><p>Coordinate candidate interviews through built-in communication modes.</p></div>{isEmployer&&<button className="primary" onClick={openCreate}><Plus/> Schedule interview</button>}</div>
 <div className="interview-grid">{interviews.map(i=><div className="interview-card" key={i.id}><div className="card-top"><div className="candidate-avatar big">{i.candidate_name[0]}</div><div><h3>{i.candidate_name}</h3><p>{i.position}</p></div><span className={'mode '+i.mode.toLowerCase()}>{i.mode}</span></div><div className="interview-time"><CalendarDays/><b>{i.scheduled_at.replace('T',' ')}</b></div><div className="call-actions"><button onClick={()=>call(i,'Voice')}><Phone/> Voice</button><button onClick={()=>call(i,'Video')}><Video/> Video</button><button onClick={()=>call(i,'Chat')}><MessageSquare/> Chat</button></div></div>)}</div></section>
}

function TaskModal({users,onClose,onDone}){
 const [f,setF]=useState({title:'',description:'',priority:'Medium',assigned_to:users.find(x=>x.role==='virtual_hr')?.id||2,due_date:''})
 async function submit(e){e.preventDefault();try{await api('/api/tasks',{method:'POST',body:JSON.stringify({...f,assigned_to:Number(f.assigned_to)})});onDone()}catch(e){alert(e.message)}}
 return <Modal title="Assign new HR task" onClose={onClose}><form onSubmit={submit}>{<Field label="Task title"><input required value={f.title} onChange={e=>setF({...f,title:e.target.value})} placeholder="e.g. Screen Python candidates"/></Field>}<Field label="Description"><textarea value={f.description} onChange={e=>setF({...f,description:e.target.value})}/></Field><div className="form-grid"><Field label="Priority"><select value={f.priority} onChange={e=>setF({...f,priority:e.target.value})}><option>Low</option><option>Medium</option><option>High</option></select></Field><Field label="Due date"><input type="date" value={f.due_date} onChange={e=>setF({...f,due_date:e.target.value})}/></Field></div><Field label="Assign to"><select value={f.assigned_to} onChange={e=>setF({...f,assigned_to:e.target.value})}>{users.filter(x=>x.role==='virtual_hr').map(u=><option key={u.id} value={u.id}>{u.name}</option>)}</select></Field><ModalActions onClose={onClose}/></form></Modal>
}
function InterviewModal({onClose,onDone}){
 const [f,setF]=useState({candidate_name:'',position:'',scheduled_at:'',mode:'Video',notes:''})
 async function submit(e){e.preventDefault();try{await api('/api/interviews',{method:'POST',body:JSON.stringify(f)});onDone()}catch(e){alert(e.message)}}
 return <Modal title="Schedule interview" onClose={onClose}><form onSubmit={submit}><Field label="Candidate name"><input required value={f.candidate_name} onChange={e=>setF({...f,candidate_name:e.target.value})}/></Field><Field label="Position"><input required value={f.position} onChange={e=>setF({...f,position:e.target.value})}/></Field><div className="form-grid"><Field label="Date & time"><input required type="datetime-local" value={f.scheduled_at} onChange={e=>setF({...f,scheduled_at:e.target.value})}/></Field><Field label="Interview mode"><select value={f.mode} onChange={e=>setF({...f,mode:e.target.value})}><option>Voice</option><option>Video</option><option>Chat</option></select></Field></div><Field label="Notes"><textarea value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/></Field><ModalActions onClose={onClose}/></form></Modal>
}
function Field({label,children}){return <label className="field">{label}{children}</label>}
function Modal({title,onClose,children}){return <div className="modal-bg"><div className="modal"><div className="modal-head"><h2>{title}</h2><button onClick={onClose}>×</button></div>{children}</div></div>}
function ModalActions({onClose}){return <div className="modal-actions"><button type="button" onClick={onClose}>Cancel</button><button className="primary">Save</button></div>}

createRoot(document.getElementById('root')).render(<App/>)
