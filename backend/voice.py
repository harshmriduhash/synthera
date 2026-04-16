from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from openai import OpenAI
import tempfile

router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    
    # Save temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".m4a") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name
    
    try:
        audio_file = open(tmp_path, "rb")
        transcript = client.audio.transcriptions.create(
            model="whisper-1", 
            file=audio_file
        )
        return {"text": transcript.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        os.remove(tmp_path)
