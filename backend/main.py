from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import sys
import os

# Add the current directory to sys.path so we can import services
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services import trend_service, ai_service
from agent import run_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductGenRequest(BaseModel):
    trend: str
    company_name: str
    industry: str
    target_audience: str
    product_type: Optional[str] = ""

@app.get("/")
def home():
    return {"message": "Agent is running 🚀"}

@app.get("/trends")
def get_trends():
    trends = trend_service.get_all_trends()
    return {"trends": trends}

@app.get("/trend/{id}")
def get_trend_details(id: int):
    trend = trend_service.get_trend_by_id(id)
    if not trend:
        raise HTTPException(status_code=404, detail="Trend not found")
    return trend

@app.get("/categories")
def get_categories():
    categories = trend_service.get_all_categories()
    return {"categories": categories}

@app.post("/generate-product")
def generate_product(req: ProductGenRequest):
    ideas = ai_service.generate_product_ideas(
        trend=req.trend,
        company_name=req.company_name,
        industry=req.industry,
        target_audience=req.target_audience,
        product_type=req.product_type
    )
    return {"product_ideas": ideas}

# Keep legacy routes so we don't break existing stuff
@app.get("/insights")
def get_insights():
    return {
        "summary": "There is a massive shift towards preventative and holistic care. Consumers are heavily investing in sleep optimization and gut health.",
        "causes": [
            "Increased screen time leading to blue light skin damage.",
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