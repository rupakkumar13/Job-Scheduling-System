# ⚙️ Job Scheduling System - Server

This is the backend service for the Job Scheduling System, built with **Node.js** and **Express**. It handles data persistence (in-memory), provides RESTful APIs, and implements the core Greedy Algorithm for job scheduling.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node index.js
   ```
   *The server runs on `http://localhost:5001` by default.*

## 🧠 Core Algorithm: Greedy Job Sequencing

The server implements a classic optimization algorithm to solve the Job Sequencing Problem:

1. **Sort**: Jobs are sorted by `profit` in descending order.
2. **Scheduling**: For each job, the algorithm attempts to find the latest possible time slot (from `deadline` down to 1) that is currently empty.
3. **Efficiency**: This greedy strategy ensures that the highest profit jobs are scheduled first, while leaving earlier slots available for jobs with tighter deadlines.

## 📡 API Reference

### Jobs Management
- `GET /jobs`: Returns an array of all current jobs.
- `POST /jobs`: Adds a new job to the list.
  - Body: `{ "name": "String", "deadline": Number, "profit": Number }`
- `POST /reset`: Clears all jobs from the in-memory storage.

### Scheduling Logic
- `GET /schedule`: Executes the Greedy Algorithm and returns the optimal schedule and total profit.

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, JSON Parser

---
*Part of the Job Scheduling System Project*
