# 🚀 Job Scheduling System

A modern, full-stack web application designed to solve the **Job Sequencing Problem with Deadlines** using a Greedy Algorithm approach. This system allows users to input various jobs with specific deadlines and associated profits, then calculates the most efficient schedule to maximize total revenue.

![Job Scheduling Dashboard](C:\Users\Rupak Kumar\.gemini\antigravity\brain\08abcef0-6a07-4c21-83fc-e25eccf4447a\job_scheduling_dashboard_1777571580363.png)

## 🌟 Key Features

- **Dynamic Job Entry:** Easily add jobs with custom names, deadlines, and profit values.
- **Real-time Scheduling:** Instantly calculate the optimal job sequence using the Greedy Job Sequencing algorithm.
- **Visual Feedback:** A clean, intuitive dashboard displaying both the full job list and the final scheduled sequence.
- **Profit Maximization:** The system automatically prioritizes high-value jobs to ensure maximum total profit.
- **Reset Capability:** Clear the workspace with a single click for new scheduling tasks.

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, CSS3 (Vanilla) |
| **Backend** | Node.js, Express.js |
| **Algorithm** | Greedy Job Sequencing (Profit-Max Strategy) |
| **API** | RESTful Architecture |

## 🧠 The Algorithm

The system implements the **Greedy Job Sequencing Algorithm**:

1. **Sort:** All jobs are sorted in descending order of their profit.
2. **Iterate:** For each job, the system looks for the latest available time slot that is $\leq$ its deadline.
3. **Assign:** If a slot is found, the job is assigned to that slot and the slot is marked as filled.
4. **Result:** This ensures that high-profit jobs are prioritized and placed as late as possible to keep earlier slots open for other potential jobs.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd JobSchedulingSystem
   ```

2. **Setup the Server:**
   ```bash
   cd server
   npm install
   node index.js
   ```
   *The server will run on `http://localhost:5001`*

3. **Setup the Client:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   *The client will be accessible at the URL provided by Vite (usually `http://localhost:5173`)*

## 📂 Project Structure

```text
JobSchedulingSystem/
├── client/                # React Frontend
│   ├── src/
│   │   ├── App.jsx        # Main Logic & UI
│   │   └── index.css      # Custom Styling
│   └── vite.config.js     # Vite Configuration
└── server/                # Node.js Backend
    ├── index.js           # Express API & Algorithm
    └── package.json       # Backend Dependencies
```

## 📝 API Endpoints

- `GET /jobs`: Retrieve all added jobs.
- `POST /jobs`: Add a new job (requires `name`, `deadline`, `profit`).
- `GET /schedule`: Run the greedy algorithm and return the optimal schedule.
- `POST /reset`: Clear all jobs from the in-memory storage.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements or new features.

---
*Created for SEM IV Project for Coding Skill II - Job Scheduling Optimization*
