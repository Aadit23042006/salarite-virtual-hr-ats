from pydantic import BaseModel, Field
from typing import Optional

class LoginRequest(BaseModel):
    email: str
    password: str

class TaskCreate(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    description: str = ""
    priority: str = "Medium"
    assigned_to: int
    due_date: str = ""

class TaskUpdate(BaseModel):
    status: str
    progress: int = Field(ge=0, le=100)

class InterviewCreate(BaseModel):
    candidate_name: str = Field(min_length=2, max_length=160)
    position: str = Field(min_length=2, max_length=160)
    scheduled_at: str
    mode: str
    notes: str = ""

class CallRequest(BaseModel):
    mode: str
