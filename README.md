# Salarite Virtual HR & ATS

A full-stack Virtual HR and Applicant Tracking System (ATS) prototype developed for the **Salarite Internship Assignment**.

The application enables employers to assign tasks to Virtual HR, monitor task progress, and schedule candidate interviews through Voice, Video, and Chat calling placeholders.

---

## 🚀 Live Demo & Submission Links

| Resource                      | Link                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **Live Application**          | https://salarite-virtual-hr-ui.onrender.com                                        |
| **GitHub Repository**         | https://github.com/Aadit23042006/salarite-virtual-hr-ats                           |
| **Backend API**               | https://salarite-virtual-hr-api.onrender.com                                       |
| **Swagger API Documentation** | https://salarite-virtual-hr-api.onrender.com/docs                                  |
| **Walkthrough Video**         | https://drive.google.com/file/d/1LeBpPCHWF9Fw9lnAU1U_-XHMpUeW4tk4/view?usp=sharing |

**Deployment Status:** Backend and frontend deployed on Render.

> Note: Render free services may take some time to respond after a period of inactivity.

---

## 1. Project Overview

Salarite Virtual HR & ATS demonstrates the essential workflow of a Virtual HR platform.

### Core Workflow

1. Employer logs into the application.
2. Employer creates and assigns tasks to Virtual HR.
3. Virtual HR views assigned tasks.
4. Virtual HR updates task status and completion progress.
5. Employer monitors task activity through the dashboard.
6. Changes become visible automatically through dashboard refresh.
7. Employer schedules candidate interviews.
8. Interview modes include Voice, Video, and Chat calling placeholders.

The application is built using Python, FastAPI, React, and SQLite.

---

## 2. Tech Stack

| Component            | Technology                            |
| -------------------- | ------------------------------------- |
| Backend              | Python                                |
| Backend Framework    | FastAPI                               |
| Frontend             | React                                 |
| Frontend Build Tool  | Vite                                  |
| Programming Language | JavaScript / JSX                      |
| Database             | SQLite                                |
| ORM                  | SQLAlchemy                            |
| API Architecture     | REST API                              |
| Real-Time Visibility | Automatic refresh (5-second interval) |
| Styling              | CSS                                   |
| Deployment           | Render                                |

---

## 3. Main Features

### Employer Dashboard

* Employer login
* Dashboard overview
* Create and assign tasks
* Assign tasks to Virtual HR
* View all tasks
* Monitor task status
* Monitor task completion progress
* View completed tasks
* Monitor Virtual HR activity
* Schedule candidate interviews
* Select interview mode

### Virtual HR Dashboard

* Virtual HR login
* View assigned tasks
* View task details
* Update task status
* Update task progress
* Mark tasks as completed
* View scheduled interviews

### Task Management

* Task creation
* Task assignment
* Task descriptions
* Task priority
* Task due dates
* Progress tracking
* Status management

Supported task statuses include:

* Pending
* In Progress
* Completed

### Interview Scheduling

* Candidate name
* Job position
* Interview date and time
* Interview mode
* Interview notes
* Scheduled interview list

Available interview modes:

* Voice
* Video
* Chat

The calling options are implemented as in-built calling placeholders for the internship prototype; they do not represent a full external telephony or video-conferencing integration.

---

## 4. Demo Credentials

Use the following credentials to access the live application.

### Employer Account

**Email**

```text
employer@salarite.demo
```

**Password**

```text
demo123
```

### Virtual HR Account

**Email**

```text
hr@salarite.demo
```

**Password**

```text
demo123
```

**Live Application:**
https://salarite-virtual-hr-ui.onrender.com

> These are demonstration credentials for the internship prototype. Do not use them for real or sensitive accounts.

---

## 5. Project Structure

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
├── render.yaml
├── RUN_PROJECT_WINDOWS.bat
├── README.md
└── .gitignore
```

The SQLite database is created and managed by the backend. A local database file may also be present depending on the development environment.

---

## 6. Local Setup Instructions

### Prerequisites

Install:

* Python 3.10 or newer
* Node.js 18 or newer
* npm
* Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/Aadit23042006/salarite-virtual-hr-ats.git
```

Navigate to the project directory:

```bash
cd salarite-virtual-hr-ats
```

### Step 2: Backend Setup

Open a terminal in the project root.

Navigate to the backend:

```bat
cd backend
```

Create a virtual environment:

```bat
python -m venv .venv
```

Activate the environment:

```bat
.venv\Scripts\activate
```

Install dependencies:

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

Swagger API Documentation:

```text
http://localhost:8000/docs
```

Backend health check:

```text
http://localhost:8000/api/health
```

### Step 3: Frontend Setup

Open a second terminal.

Navigate to the frontend directory from the project root:

```bat
cd frontend
```

Install dependencies:

```bat
npm install
```

Start the React development server:

```bat
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

The Vite development server proxies API requests to the FastAPI backend.

### Step 4: Login

Open:

```text
http://localhost:5173
```

Select the appropriate role and use the demo credentials.

**Employer**

```text
Email: employer@salarite.demo
Password: demo123
```

**Virtual HR**

```text
Email: hr@salarite.demo
Password: demo123
```

---

## 7. Recommended Demonstration Workflow

Follow this sequence to demonstrate the complete ATS workflow.

```text
                 EMPLOYER LOGIN
                       |
                       v
                EMPLOYER DASHBOARD
                       |
                       v
                  CREATE TASK
                       |
                       v
              ASSIGN TASK TO VIRTUAL HR
                       |
                       v
                 VIRTUAL HR LOGIN
                       |
                       v
                VIEW ASSIGNED TASK
                       |
                       v
              UPDATE PROGRESS TO 50%
                       |
                       v
                STATUS: IN PROGRESS
                       |
                       v
               EMPLOYER DASHBOARD
                       |
                       v
             VERIFY AUTOMATIC UPDATE
                       |
                       v
             UPDATE PROGRESS TO 100%
                       |
                       v
                STATUS: COMPLETED
                       |
                       v
              EMPLOYER VERIFICATION
                       |
                       v
              SCHEDULE CANDIDATE
                    INTERVIEW
                       |
                       v
             SELECT INTERVIEW MODE
                       |
                       v
              VOICE / VIDEO / CHAT
```

---

## 8. API Endpoints

The backend exposes REST API endpoints through FastAPI.

### General

| Method | Endpoint      | Purpose              |
| ------ | ------------- | -------------------- |
| GET    | `/`           | Root endpoint        |
| GET    | `/api`        | API information      |
| GET    | `/api/health` | Backend health check |

### Authentication

| Method | Endpoint          | Purpose    |
| ------ | ----------------- | ---------- |
| POST   | `/api/auth/login` | User login |

### Users

| Method | Endpoint     | Purpose        |
| ------ | ------------ | -------------- |
| GET    | `/api/users` | Retrieve users |

### Tasks

| Method | Endpoint               | Purpose                          |
| ------ | ---------------------- | -------------------------------- |
| GET    | `/api/tasks`           | Retrieve tasks                   |
| POST   | `/api/tasks`           | Create a task                    |
| PATCH  | `/api/tasks/{task_id}` | Update task details and progress |

### Dashboard

| Method | Endpoint         | Purpose                        |
| ------ | ---------------- | ------------------------------ |
| GET    | `/api/dashboard` | Retrieve dashboard information |

### Interviews

| Method | Endpoint                              | Purpose                              |
| ------ | ------------------------------------- | ------------------------------------ |
| GET    | `/api/interviews`                     | Retrieve scheduled interviews        |
| POST   | `/api/interviews`                     | Schedule an interview                |
| POST   | `/api/interviews/{interview_id}/call` | Handle interview calling placeholder |

### Interactive API Documentation

Local:

http://localhost:8000/docs

Production:

https://salarite-virtual-hr-api.onrender.com/docs

---

## 9. Interview Scheduling

The interview module allows employers to schedule candidate interviews.

### Interview Information

* Candidate name
* Job position
* Interview date
* Interview time
* Interview mode
* Interview notes

### Available Modes

```text
1. Voice
2. Video
3. Chat
```

The application includes calling placeholders to demonstrate the interview workflow.

---

## 10. Testing & Verification

The project has been tested locally and through the deployed Render application.

### Authentication

* Employer login verified.
* Virtual HR login verified.
* Both dashboards opened successfully.

### Task Management

* Employer task creation verified.
* Task assignment verified.
* Virtual HR task visibility verified.
* Task status updates verified.
* Task progress updates verified.
* 50% progress and In Progress workflow verified.
* 100% progress and Completed workflow verified.

### Employer Monitoring

* Employer dashboard verified.
* Automatic dashboard refresh verified.
* Virtual HR updates visible to Employer verified.

### Interview Scheduling

* Candidate interview scheduling verified.
* Voice mode option verified.
* Video mode option verified.
* Chat mode option verified.
* Scheduled interview visibility verified.

### Database

* SQLite persistence tested locally.
* Task persistence tested locally.
* Interview persistence tested locally.
* Backend restart persistence tested locally.

### Deployment

* Backend deployment on Render verified.
* Frontend deployment on Render verified.
* Live application access verified.
* Production API health check verified.
* Employer dashboard verified.
* Virtual HR dashboard verified.

### End-to-End Workflow

```text
Employer
   |
   v
Assign Task
   |
   v
Virtual HR
   |
   v
Update Progress
   |
   v
Employer Live Monitoring
   |
   v
Complete Task
   |
   v
Employer Verification
   |
   v
Schedule Interview
   |
   v
Voice / Video / Chat
```

The core assignment workflow was successfully tested.

---

## 11. Quick Windows Startup

The repository includes Windows startup scripts.

### Main Startup Script

```text
RUN_PROJECT_WINDOWS.bat
```

### Backend Startup Script

```text
backend/start_backend.bat
```

### Frontend Startup Script

```text
frontend/start_frontend.bat
```

These scripts simplify local project startup on Windows.

---

## 12. Deployment

The project includes a Render deployment configuration:

```text
render.yaml
```

### Deployment Architecture

```text
             USER / BROWSER
                    |
                    v
             REACT FRONTEND
                    |
                    v
              REST API
                    |
                    v
             FASTAPI BACKEND
                    |
                    v
              SQLITE DATABASE
```

### Live Deployment

**Frontend:**

https://salarite-virtual-hr-ui.onrender.com

**Backend:**

https://salarite-virtual-hr-api.onrender.com

**API Documentation:**

https://salarite-virtual-hr-api.onrender.com/docs

### Deployment Notes

* The frontend is deployed as a Render Static Site.
* The backend is deployed as a Render Web Service.
* The frontend communicates with the backend through REST API requests.
* Render free services may spin down after inactivity.
* The SQLite database is suitable for this assignment prototype. The free Render filesystem is ephemeral, so database data should not be treated as permanently durable across service replacement or redeployment. A persistent database service is recommended for production.

---

## 13. Assignment Requirement Alignment

The project addresses the requirements of the Salarite Virtual HR internship assignment.

| Company Requirement             | Implementation    |
| ------------------------------- | ----------------- |
| Employer task assignment screen | Implemented       |
| Virtual HR task update screen   | Implemented       |
| Basic task list                 | Implemented       |
| Task status changes             | Implemented       |
| Interview scheduling            | Implemented       |
| Voice calling placeholder       | Implemented       |
| Video calling placeholder       | Implemented       |
| Chat calling placeholder        | Implemented       |
| Employer task monitoring        | Implemented       |
| Automatic progress visibility   | Implemented       |
| Python backend                  | FastAPI           |
| React dashboard                 | React + Vite      |
| Database                        | SQLite            |
| Real-time visibility            | Automatic refresh |
| Deployment                      | Render            |

---

## 14. Submission Deliverables

### Mandatory Deliverables

**1. Live Demo**

https://salarite-virtual-hr-ui.onrender.com

**2. GitHub Repository**

https://github.com/Aadit23042006/salarite-virtual-hr-ats

**3. README**

This document includes:

* Project overview
* Technology stack
* Features
* Demo credentials
* Project structure
* Local setup instructions
* API documentation
* Testing information
* Deployment information

### Walkthrough Video

**Video Link:**

https://drive.google.com/file/d/1LeBpPCHWF9Fw9lnAU1U_-XHMpUeW4tk4/view?usp=sharing

The walkthrough demonstrates the application workflow, including:

* Employer dashboard
* Task creation and assignment
* Virtual HR task execution
* Progress updates
* Employer monitoring
* Interview scheduling
* Voice, Video, and Chat options

---

## 15. Security Notes

* Do not commit real passwords, API keys, access tokens, private keys, or `.env` files to GitHub.
* The credentials in this README are demonstration credentials.
* Use proper authentication, authorization, secure secrets management, and persistent database infrastructure before production use.

---

## 16. Future Improvements

Potential improvements for a production-ready version include:

* WebSocket-based real-time updates.
* Advanced employer and HR role-based access control.
* Candidate management and application tracking.
* Email notifications.
* Calendar integration.
* Actual Voice and Video calling integration.
* Persistent production database.
* Advanced reporting and analytics.
* Audit logs and activity history.

---

## 17. Author

**Aadit Choudhary**

**Project:** Salarite Virtual HR & ATS
**Purpose:** Salarite Internship Assignment
**Backend:** Python + FastAPI
**Frontend:** React + Vite
**Database:** SQLite

---

**Salarite Virtual HR & ATS — Employer Task Management, Virtual HR Execution, and Interview Scheduling.**
