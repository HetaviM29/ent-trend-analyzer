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

@app.get("/trends")
def get_trends():
    return {
        "trends": [
            {"id": 1, "keyword": "Herbal Skincare", "category": "Skin", "mentions": 12450, "growth": "+45%"},
            {"id": 2, "keyword": "Sleep Tracking Rings", "category": "Mental Health", "mentions": 8300, "growth": "+32%"},
            {"id": 3, "keyword": "Tinnitus Relief Soundscapes", "category": "ENT", "mentions": 5200, "growth": "+18%"},
            {"id": 4, "keyword": "Heart Rate Variability Training", "category": "Cardiology", "mentions": 4100, "growth": "+25%"},
            {"id": 5, "keyword": "Gut-Brain Axis Diets", "category": "Mental Health", "mentions": 15000, "growth": "+60%"}
        ]
    }

@app.get("/categories")
def get_categories():
    return {
        "categories": [
            {
                "name": "ENT",
                "count": 320,
                "top_issues": ["Tinnitus Therapies", "Sinus Rinse Alternatives", "Vocal Cord Care"]
            },
            {
                "name": "Cardiology",
                "count": 450,
                "top_issues": ["Wearable ECGs", "Low-Sodium Supplements", "Stress-Induced Palpitations"]
            },
            {
                "name": "Mental Health",
                "count": 890,
                "top_issues": ["Digital Detox Retreats", "Micro-dosing Guidance", "Sleep Optimization"]
            },
            {
                "name": "Skin",
                "count": 650,
                "top_issues": ["Skin Barrier Repair", "Ceramide Alternatives", "Blue Light Protection"]
            }
        ]
    }

@app.get("/insights")
def get_insights():
    return {
        "summary": "There is a massive shift towards preventative and holistic care. Consumers are heavily investing in sleep optimization and gut health, viewing them as foundational to both mental and physical wellness.",
        "causes": [
            "Increased screen time leading to blue light skin damage and sleep disruption.",
            "Post-pandemic focus on immune and gut health.",
            "Rising accessibility of wearable health tracking tech."
        ],
        "product_ideas": [
            "A dual-action supplement targeting both gut flora and skin barrier repair.",
            "An app combining sleep tracking with personalized acoustic therapies for tinnitus."
        ]
    }

@app.post("/analyze")
def analyze(data: dict):
    try:
        if not data.get("text"):
            return {"error": "No text provided"}
        result = run_agent(data["text"])
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}