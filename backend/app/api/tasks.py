from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import uuid

router = APIRouter()

# In-memory store (can be replaced with DB later)
tasks = []

# Request model
class TaskCreate(BaseModel):
    title: str
    description: str

# Response model
class Task(BaseModel):
    id: str
    title: str
    description: str

@router.post("/add", response_model=Task)
def add_task(task: TaskCreate):
    new_task = {
        "id": str(uuid.uuid4()),
        "title": task.title,
        "description": task.description,
    }
    tasks.append(new_task)
    return new_task

@router.get("/all", response_model=List[Task])
def get_all_tasks():
    return tasks