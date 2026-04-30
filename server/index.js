const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// In-memory job storage
let jobs = [];

// API: Add a job
app.post('/jobs', (req, res) => {
    const { name, deadline, profit } = req.body;
    
    if (!name || deadline === undefined || profit === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newJob = {
        id: Date.now(),
        name,
        deadline: parseInt(deadline),
        profit: parseInt(profit)
    };

    jobs.push(newJob);
    res.status(201).json(newJob);
});

// API: Get all jobs
app.get('/jobs', (req, res) => {
    res.json(jobs);
});

// API: Run Scheduler (Greedy Algorithm)
app.get('/schedule', (req, res) => {
    if (jobs.length === 0) {
        return res.json({ scheduledJobs: [], totalProfit: 0 });
    }

    // 1. Sort jobs in descending order of profit
    const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);

    // 2. Find maximum deadline to determine number of slots
    const maxDeadline = Math.max(...jobs.map(j => j.deadline));
    
    // 3. Initialize slots (using 1-based indexing for simplicity with deadlines)
    const slots = new Array(maxDeadline + 1).fill(null);
    const scheduledJobs = [];
    let totalProfit = 0;

    // 4. Assign jobs to the latest available slot before their deadline
    for (const job of sortedJobs) {
        for (let t = job.deadline; t > 0; t--) {
            if (slots[t] === null) {
                slots[t] = job;
                scheduledJobs.push({
                    ...job,
                    slot: t
                });
                totalProfit += job.profit;
                break;
            }
        }
    }

    // Sort scheduled jobs by slot for better display
    scheduledJobs.sort((a, b) => a.slot - b.slot);

    res.json({
        scheduledJobs,
        totalProfit
    });
});

// Reset jobs (useful for demo)
app.post('/reset', (req, res) => {
    jobs = [];
    res.json({ message: 'Jobs cleared' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
