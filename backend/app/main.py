from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from .database import Base, engine, get_db
from .models import User, Task, Interview
from .schemas import LoginRequest, TaskCreate, TaskUpdate, InterviewCreate, CallRequest

app = FastAPI(title="Salarite Virtual HR API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def seed(db: Session):
    if db.query(User).count() == 0:
        employer = User(name="Salarite Employer", email="employer@salarite.demo", password="demo123", role="employer")
        hr = User(name="Virtual HR", email="hr@salarite.demo", password="demo123", role="virtual_hr")
        db.add_all([employer, hr])
        db.commit()
    employer = db.query(User).filter_by(email="employer@salarite.demo").first()
    hr = db.query(User).filter_by(email="hr@salarite.demo").first()
    if db.query(Task).count() == 0 and employer and hr:
        db.add(Task(title="Screen Python Developer Applications",
                    description="Review shortlisted candidates and prepare the first-round interview list.",
                    priority="High", status="In Progress", progress=60,
                    assigned_to=hr.id, created_by=employer.id, due_date="2026-11-05"))
        db.add(Task(title="Prepare Interview Questions",
                    description="Prepare a structured technical question set for the Python role.",
                    priority="Medium", status="Pending", progress=0,
                    assigned_to=hr.id, created_by=employer.id, due_date="2026-11-06"))
        db.add(Interview(candidate_name="Priya Mehta", position="Frontend Developer",
                         scheduled_at="2026-11-06T11:00", mode="Video",
                         created_by=employer.id))
        db.commit()

@app.on_event("startup")
def startup():
    db = next(get_db())
    try:
        seed(db)
    finally:
        db.close()

@app.get("/")
def root():
    return {"name": "Salarite Virtual HR API", "status": "running"}

@app.get("/api")
def api_root():
    return {"name": "Salarite Virtual HR API", "status": "running"}

@app.get("/api/health")
def health():
    return {"status": "healthy"}

@app.post("/api/auth/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=payload.email, password=payload.password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"id": user.id, "name": user.name, "email": user.email, "role": user.role}

@app.get("/api/users")
def users(db: Session = Depends(get_db)):
    return [{"id": u.id, "name": u.name, "email": u.email, "role": u.role}
            for u in db.query(User).all()]

@app.get("/api/tasks")
def list_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).order_by(Task.updated_at.desc()).all()
    return [{
        "id": t.id, "title": t.title, "description": t.description,
        "priority": t.priority, "status": t.status, "progress": t.progress,
        "assigned_to": t.assigned_to, "created_by": t.created_by,
        "due_date": t.due_date, "updated_at": t.updated_at.isoformat() if t.updated_at else None
    } for t in tasks]

@app.post("/api/tasks")
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    assignee = db.query(User).filter_by(id=payload.assigned_to, role="virtual_hr").first()
    if not assignee:
        raise HTTPException(status_code=400, detail="Virtual HR user not found")
    task = Task(**payload.model_dump(), created_by=1)
    db.add(task)
    db.commit()
    db.refresh(task)
    return {"id": task.id, "message": "Task assigned successfully"}

@app.patch("/api/tasks/{task_id}")
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter_by(id=task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    allowed = {"Pending", "In Progress", "Completed", "Blocked"}
    if payload.status not in allowed:
        raise HTTPException(status_code=400, detail="Invalid status")
    task.status = payload.status
    task.progress = payload.progress
    db.commit()
    return {"message": "Task updated", "task_id": task.id}

@app.get("/api/dashboard")
def dashboard(db: Session = Depends(get_db)):
    total = db.query(Task).count()
    pending = db.query(Task).filter_by(status="Pending").count()
    progress = db.query(Task).filter_by(status="In Progress").count()
    completed = db.query(Task).filter_by(status="Completed").count()
    interviews = db.query(Interview).filter_by(status="Scheduled").count()
    return {"total": total, "pending": pending, "in_progress": progress, "completed": completed, "interviews": interviews}

@app.get("/api/interviews")
def list_interviews(db: Session = Depends(get_db)):
    items = db.query(Interview).order_by(Interview.scheduled_at.asc()).all()
    return [{
        "id": x.id, "candidate_name": x.candidate_name, "position": x.position,
        "scheduled_at": x.scheduled_at, "mode": x.mode, "status": x.status, "notes": x.notes
    } for x in items]

@app.post("/api/interviews")
def create_interview(payload: InterviewCreate, db: Session = Depends(get_db)):
    if payload.mode not in {"Voice", "Video", "Chat"}:
        raise HTTPException(status_code=400, detail="Mode must be Voice, Video, or Chat")
    interview = Interview(**payload.model_dump(), created_by=1)
    db.add(interview)
    db.commit()
    db.refresh(interview)
    return {"id": interview.id, "message": "Interview scheduled"}

@app.post("/api/interviews/{interview_id}/call")
def call_placeholder(interview_id: int, payload: CallRequest, db: Session = Depends(get_db)):
    interview = db.query(Interview).filter_by(id=interview_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    if payload.mode not in {"Voice", "Video", "Chat"}:
        raise HTTPException(status_code=400, detail="Unsupported call mode")
    return {"message": f"{payload.mode} calling placeholder launched", "interview_id": interview_id, "mode": payload.mode}
