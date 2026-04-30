import { useState, useEffect } from 'react'

function App() {
  const [jobs, setJobs] = useState([])
  const [scheduleData, setScheduleData] = useState({ scheduledJobs: [], totalProfit: 0 })
  const [formData, setFormData] = useState({ name: '', deadline: '', profit: '' })
  const [status, setStatus] = useState({ type: '', message: '' })

  const API_BASE = 'http://localhost:5001'

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE}/jobs`)
      const data = await res.json()
      setJobs(data)
    } catch (err) {
      showStatus('error', 'Failed to fetch jobs')
    }
  }

  const showStatus = (type, message) => {
    setStatus({ type, message })
    setTimeout(() => setStatus({ type: '', message: '' }), 3000)
  }

  const handleAddJob = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.deadline || !formData.profit) {
      showStatus('error', 'Please fill all fields')
      return
    }

    if (parseInt(formData.deadline) <= 0 || parseInt(formData.profit) < 0) {
      showStatus('error', 'Invalid deadline or profit')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        showStatus('success', 'Job added successfully')
        setFormData({ name: '', deadline: '', profit: '' })
        fetchJobs()
      } else {
        const error = await res.json()
        showStatus('error', error.error || 'Failed to add job')
      }
    } catch (err) {
      showStatus('error', 'Network error')
    }
  }

  const runScheduler = async () => {
    try {
      const res = await fetch(`${API_BASE}/schedule`)
      const data = await res.json()
      setScheduleData(data)
      showStatus('success', 'Optimal schedule generated')
    } catch (err) {
      showStatus('error', 'Failed to run scheduler')
    }
  }

  const resetJobs = async () => {
    try {
      await fetch(`${API_BASE}/reset`, { method: 'POST' })
      setJobs([])
      setScheduleData({ scheduledJobs: [], totalProfit: 0 })
      showStatus('success', 'Jobs cleared')
    } catch (err) {
      showStatus('error', 'Failed to reset')
    }
  }

  return (
    <div className="container">
      <h1>Job Scheduling System</h1>

      {status.message && (
        <div className={`status-msg ${status.type}`}>
          {status.message}
        </div>
      )}

      <div className="grid">
        {/* Left Side: Add Job Form & Job List */}
        <div className="space-y">
          <div className="card">
            <h2>Add New Job</h2>
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label>Job Name</label>
                <input
                  type="text"
                  placeholder="e.g. Data Analysis"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Deadline (Slot number)</label>
                <input
                  type="number"
                  placeholder="e.g. 2"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Profit</label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={formData.profit}
                  onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
                />
              </div>
              <button type="submit">Add Job</button>
            </form>
          </div>

          <div className="card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Jobs List</h2>
              <button 
                onClick={resetJobs} 
                className="secondary" 
                style={{ width: 'auto', marginTop: 0, padding: '0.25rem 0.75rem' }}
              >
                Clear
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Deadline</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.name}</td>
                    <td><span className="deadline-badge">{job.deadline}</span></td>
                    <td><span className="profit-badge">${job.profit}</span></td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                      No jobs added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Scheduler Results */}
        <div className="space-y">
          <div className="card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ marginBottom: 0 }}>Optimal Schedule</h2>
              <button 
                onClick={runScheduler} 
                disabled={jobs.length === 0}
                style={{ width: 'auto', opacity: jobs.length === 0 ? 0.5 : 1 }}
              >
                Run Scheduler
              </button>
            </div>

            <div style={{ flex: 1 }}>
              {scheduleData.scheduledJobs.length > 0 ? (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Slot</th>
                        <th>Job Name</th>
                        <th>Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData.scheduledJobs.map((job) => (
                        <tr key={job.id}>
                          <td><span className="slot-badge">Slot {job.slot}</span></td>
                          <td>{job.name}</td>
                          <td><span className="profit-badge">${job.profit}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="total-profit">
                    <span>Total Profit</span>
                    <span className="profit-value">${scheduleData.totalProfit}</span>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', color: '#64748b', marginTop: '4rem' }}>
                  Click "Run Scheduler" to see the results
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ marginTop: '2rem' }}>
            <h2>Greedy Algorithm Logic</h2>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.6' }}>
              The system uses the <strong>Greedy Job Sequencing Algorithm</strong>:
              <br /><br />
              1. Sort all jobs in descending order of profit.<br />
              2. For each job, find the latest available time slot (before or at its deadline).<br />
              3. If a slot is found, assign the job and mark the slot as filled.<br />
              4. This strategy ensures we prioritize high-profit jobs and place them as late as possible to leave earlier slots for other potential jobs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
