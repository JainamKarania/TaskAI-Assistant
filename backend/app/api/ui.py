from fastapi import APIRouter, Form, Request
from fastapi.responses import HTMLResponse
from app.services.gemini_service import get_gemini_response
from app.api.tasks import add_task, get_all_tasks, TaskCreate

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def home():
    return """
    <html>
        <head><title>Gemini Assistant</title></head>
        <body>
            <h2>Ask Gemini</h2>
            <form action="/" method="post">
                <input name="prompt" placeholder="Enter prompt" style="width: 300px;"/>
                <button type="submit">Ask</button>
            </form>
            <br><a href="/tasks">View Tasks</a>
        </body>
    </html>
    """

@router.post("/", response_class=HTMLResponse)
async def ask_ui(prompt: str = Form(...)):
    response = get_gemini_response(prompt)
    return f"""
    <html>
        <head><title>Gemini Assistant</title></head>
        <body>
            <h2>Response</h2>
            <p><strong>Prompt:</strong> {prompt}</p>
            <p><strong>Response:</strong> {response}</p>
            <br><a href="/">Back</a> | <a href="/tasks">View Tasks</a>
        </body>
    </html>
    """

# ------------------------
# Task UI routes
# ------------------------

@router.get("/tasks", response_class=HTMLResponse)
async def view_tasks():
    tasks = get_all_tasks()
    task_html = "".join(
        f"<li><b>{task['title']}</b>: {task['description']}</li>" for task in tasks
    )

    return f"""
    <html>
        <head><title>Task Manager</title></head>
        <body>
            <h2>All Tasks</h2>
            <ul>{task_html}</ul>
            <br>
            <h3>Add New Task</h3>
            <form action="/tasks" method="post">
                <input name="title" placeholder="Title" required/>
                <input name="description" placeholder="Description" required/>
                <button type="submit">Add Task</button>
            </form>
            <br><a href="/">Back to Gemini</a>
        </body>
    </html>
    """

@router.post("/tasks", response_class=HTMLResponse)
async def add_task_ui(title: str = Form(...), description: str = Form(...)):
    task_data = TaskCreate(title=title, description=description)
    add_task(task_data)
    return await view_tasks()
