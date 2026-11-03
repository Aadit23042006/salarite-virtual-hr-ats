from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(30), nullable=False)

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, default="")
    priority = Column(String(20), default="Medium")
    status = Column(String(30), default="Pending")
    progress = Column(Integer, default=0)
    assigned_to = Column(Integer, nullable=False)
    created_by = Column(Integer, nullable=False)
    due_date = Column(String(30), default="")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Interview(Base):
    __tablename__ = "interviews"
    id = Column(Integer, primary_key=True)
    candidate_name = Column(String(160), nullable=False)
    position = Column(String(160), nullable=False)
    scheduled_at = Column(String(50), nullable=False)
    mode = Column(String(20), nullable=False)
    status = Column(String(30), default="Scheduled")
    notes = Column(Text, default="")
    created_by = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
