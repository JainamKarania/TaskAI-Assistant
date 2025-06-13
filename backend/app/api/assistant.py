from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini_service import get_gemini_response

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/ask")
async def ask_assistant(request: PromptRequest):
    try:
        response = get_gemini_response(request.prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
