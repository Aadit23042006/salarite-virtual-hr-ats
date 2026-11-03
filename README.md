# Salarite Virtual HR & ATS

A Virtual HR + Applicant Tracking System (ATS) prototype built for the Salarite internship assignment.

## Project Overview

This project demonstrates the core Virtual HR and ATS workflow:

1. Employer assigns tasks to Virtual HR.
2. Virtual HR views assigned tasks.
3. Virtual HR updates task status and progress.
4. Employer monitors task activity through the dashboard.
5. Task changes become visible automatically through dashboard refresh.
6. Employer schedules candidate interviews.
7. Interview modes include Voice, Video, and Chat calling placeholders.

The project is built as a lightweight full-stack application using FastAPI, React, and SQLite.

---

## Tech Stack

* **Backend:** Python + FastAPI
* **Frontend:** React + Vite
* **Database:** SQLite
* **API:** REST API
* **Real-time visibility:** Automatic dashboard refresh
* **Deployment:** Render / Railway compatible

---

## Main Features

### Employer

* Employer login
* Employer dashboard
* Create tasks
* Assign tasks to Virtual HR
* View task status
* View task progress
* Monitor Virtual HR activity
* Schedule candidate interviews
* Select interview mode:

  * Voice
  * Video
  * Chat

### Virtual HR

* Virtual HR login
* View assigned tasks
* View task details
* Update task status
* Update task progress
* Mark tasks as completed

### Interview Scheduling

* Candidate name
* Job position
* Interview date
* Interview time
* Interview mode
* Interview notes
* Scheduled interview list
* Voice calling placeholder
* Video calling placeholder
* Chat calling placeholder

---

# Demo Credentials

## Employer Account

**Email**

```text
employer@salarite.demo
```

**Password**

```text
demo123
```

## Virtual HR Account

**Email**

```text
hr@salarite.demo
```

**Password**

```text
demo123
```

---

# Live Demo

The live demo URL will be added after deployment.

**Live Demo:**

```text
ADD_FINAL_LIVE_DEMO_URL_HERE
```

---

# GitHub Repository

The GitHub repository URL will be added after the repository is created.

**GitHub Repository:**

```text
ADD_FINAL_GITHUB_REPOSITORY_URL_HERE
```

---

# Project Structure

```text
salarite-virtual-hr/
│
├── backend/
│   ├── requirements.txt
│   ├── start_backend.bat
│   │
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── models.py
│       ├── database.py
│       └── schemas.py
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── start_frontend.bat
│   │
│   └── src/
│       ├── main.jsx
│       └── styles.css
│
├── salarite.db
├── render.yaml
├── RUN_PROJECT_WINDOWS.bat
├── README.md
└── .gitignore
```

---

# Local Setup

## Prerequisites

Install the following:

* Python 3.10+
* Node.js 18+
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd salarite-virtual-hr
```

---

# 2. Backend Setup

Open a terminal in the project directory.

```bat
cd backend
```

Create a Python virtual environment:

```bat
python -m venv .venv
```

Activate it:

```bat
.venv\Scripts\activate
```

Install backend dependencies:

```bat
pip install -r requirements.txt
```

Start the FastAPI backend:

```bat
python -m uvicorn app.main:app --reload --port 8000
```

Backend URL:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

---

# 3. Frontend Setup

Open a **second terminal**.

From the project root:

```bat
cd frontend
```

Install dependencies:

```bat
npm install
```

Start the React/Vite frontend:

```bat
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

The Vite development server proxies `/api` requests to the FastAPI backend.

---

# 4. Login

Open:

```text
http://localhost:5173
```

Use the demo credentials provided above.

### Employer

```text
Email: employer@salarite.demo
Password: demo123
```

### Virtual HR

```text
Email: hr@salarite.demo
Password: demo123
```

---

# 5. Recommended Demo Workflow

The recommended demonstration sequence is:

```text
Employer Login
       ↓
Employer Dashboard
       ↓
Create Task
       ↓
Assign Task to Virtual HR
       ↓
Virtual HR Login
       ↓
View Assigned Task
       ↓
Update Progress to 50%
       ↓
Set Status to In Progress
       ↓
Employer Dashboard
       ↓
Employer Sees Updated Progress Automatically
       ↓
Virtual HR Updates Progress to 100%
       ↓
Set Status to Completed
       ↓
Employer Verifies Completed Task
       ↓
Schedule Candidate Interview
       ↓
Select Interview Mode
       ↓
Voice / Video / Chat Placeholder
```

---

# 6. API Endpoints

## Health

```http
GET /api/health
```

## Authentication

```http
POST /api/auth/login
```

## Users

```http
GET /api/users
```

## Tasks

```http
GET /api/tasks
POST /api/tasks
PATCH /api/tasks/{task_id}
```

## Dashboard

```http
GET /api/dashboard
```

## Interviews

```http
GET /api/interviews
POST /api/interviews
POST /api/interviews/{interview_id}/call
```

---

# 7. Interview Scheduling

The application supports interview scheduling with:

* Candidate name
* Job position
* Date
* Time
* Interview mode
* Notes

Available interview modes:

```text
Voice
Video
Chat
```

The calling buttons are implemented as in-built calling placeholders for the internship prototype.

---

# 8. Testing Completed

The core assignment workflow has been tested locally.

### Authentication

* Employer login verified
* Virtual HR login verified

### Task Management

* Employer task creation verified
* Task assignment verified
* Virtual HR task visibility verified
* Task status update verified
* Task progress update verified
* 50% progress workflow verified
* 100% progress workflow verified
* Completed status verified

### Employer Monitoring

* Employer dashboard monitoring verified
* Automatic dashboard refresh verified
* Virtual HR changes visible to Employer verified

### Interview Scheduling

* Candidate interview scheduling verified
* Voice calling placeholder verified
* Video calling placeholder verified
* Chat calling placeholder verified

### Database

* SQLite persistence verified
* Task persistence verified
* Interview persistence verified
* Backend restart persistence verified

### End-to-End Workflow

```text
Employer
   ↓
Assign Task
   ↓
Virtual HR
   ↓
Update Progress
   ↓
Employer Live Monitoring
   ↓
Complete Task
   ↓
Employer Verification
   ↓
Interview Scheduling
```

The complete workflow was tested successfully in the local environment.

---

# 9. Quick Windows Start

The repository includes:

```text
RUN_PROJECT_WINDOWS.bat
```

Backend startup script:

```text
backend/start_backend.bat
```

Frontend startup script:

```text
frontend/start_frontend.bat
```

These can be used to simplify local startup on Windows.

---

# 10. Deployment

The project contains:

```text
render.yaml
```

for deployment configuration.

Recommended deployment process:

1. Push the project to GitHub.
2. Create a Render or Railway service.
3. Connect the GitHub repository.
4. Configure the required environment variables if needed.
5. Deploy the backend.
6. Deploy the frontend.
7. Verify the live application.
8. Test login.
9. Test task assignment.
10. Test Virtual HR progress updates.
11. Test Employer monitoring.
12. Test interview scheduling.
13. Add the final Live Demo URL to this README.

---

# 11. Submission Deliverables

## Mandatory

### 1. Live Demo Link

```text
https://drive.google.com/file/d/1LeBpPCHWF9Fw9lnAU1U_-XHMpUeW4tk4/view?usp=sharing
```

### 2. GitHub Repository

```text
https://github.com/Aadit23042006/salarite-virtual-hr-ats
```

### 3. README

This README contains:

* Project overview
* Technology stack
* Setup instructions
* Demo credentials
* Project structure
* API information
* Demo workflow
* Testing information
* Deployment information

## Optional

### 4. 2-Minute Walkthrough Video

A short walkthrough video can demonstrate:

```text
Employer Login
      ↓
Create / Assign Task
      ↓
Virtual HR Login
      ↓
Update Task Progress
      ↓
Employer Live Monitoring
      ↓
Complete Task
      ↓
Schedule Interview
      ↓
Voice / Video / Chat Placeholder
```

---

# 12. Assignment Requirement Alignment

The project implements the required intern-version workflow:

* Employer task assignment screen
* Virtual HR task update screen
* Basic task list
* Task status changes
* Interview scheduling
* In-built calling placeholders
* Employer visibility into task progress
* SQLite database
* React dashboard
* FastAPI backend
* Automatic refresh for live task visibility

---

# 13. Security Notes

Do not commit real credentials, API keys, tokens, private keys, or `.env` files to GitHub.

The demo credentials in this README are demonstration credentials for the internship assignment.

---

# 14. Author

**Aadit Choudhary**

Salarite Virtual HR & ATS — Internship Assignment