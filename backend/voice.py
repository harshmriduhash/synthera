from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import tempfile
from groq import Groq

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    if not os.getenv("GROQ_API_KEY"):
        raise HTTPException(status_code=500, detail="Groq API key not configured")
    
    # Save temp file
    suffix = "." + (file.filename.split(".")[-1] if file.filename and "." in file.filename else "webm")
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name
    
    try:
        with open(tmp_path, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-large-v3",
                file=audio_file,
                response_format="text"
            )
        return {"text": transcript}
    except Exception as e:
        print(f"Transcription error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        os.remove(tmp_path)
