from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api import assistant, tasks  # 👈 tasks imported
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assistant.router, prefix="/api/assistant")
for route in app.routes:
    print(f"{route.path} -> {route.endpoint}")
app.include_router(tasks.router, prefix="/api/tasks")# 👈 tasks route added

BASE_DIR = Path(__file__).resolve().parent.parent.parent
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"

print(f"Looking for frontend at: {FRONTEND_DIST}")

if FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIST), html=True), name="frontend")
    print("✅ Frontend mounted successfully.")
else:
    print("⚠️ Warning: 'frontend/dist' not found. Run `npm run build` inside /frontend.")
