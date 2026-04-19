from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent import run_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Agent is running 🚀"}

@app.post("/analyze")
def analyze(data: dict):
    try:
        if not data.get("text"):
            return {"error": "No text provided"}
        result = run_agent(data["text"])
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}