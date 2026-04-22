from datetime import datetime, timezone
from typing import Optional

mock_trends = [
    {
        "id": 1, "keyword": "Herbal Skincare", "category": "Skin", "mentions": 12450, "growth": "+45%", 
        "platform": "TikTok", "authenticity": "Real", 
        "engagement": "High", "sentiment": "Positive", "reason": "Consistent scientific backing and user testimonials.", 
        "insights": "Consumers are shifting away from harsh chemicals."
    },
    {
        "id": 2, "keyword": "Sleep Tracking Rings", "category": "Mental Health", "mentions": 8300, "growth": "+32%", 
        "platform": "Reddit", "authenticity": "Real",
        "engagement": "High", "sentiment": "Positive", "reason": "Valid clinical studies support wearable trackers.",
        "insights": "People want frictionless health tracking."
    },
    {
        "id": 3, "keyword": "DIY Castor Oil Eye Drops", "category": "ENT", "mentions": 5200, "growth": "+18%", 
        "platform": "TikTok", "authenticity": "Misleading",
        "engagement": "Medium", "sentiment": "Neutral", "reason": "No medical evidence. Can cause infections.",
        "insights": "People seek cheap home remedies despite risks."
    },
    {
        "id": 4, "keyword": "Heart Rate Variability Training", "category": "Cardiology", "mentions": 4100, "growth": "+25%", 
        "platform": "Instagram", "authenticity": "Real",
        "engagement": "Low", "sentiment": "Positive", "reason": "Standard cardiological practice.",
        "insights": "Niche fitness communities are adopting advanced metrics."
    },
    {
        "id": 5, "keyword": "Gut-Brain Axis Diets", "category": "Mental Health", "mentions": 15000, "growth": "+60%", 
        "platform": "Twitter", "authenticity": "Real",
        "engagement": "High", "sentiment": "Positive", "reason": "Strong emerging literature on microbiome.",
        "insights": "Diet is increasingly viewed as mental health intervention."
    },
    {
        "id": 6, "keyword": "Sunscreen Causes Cancer", "category": "Skin", "mentions": 18000, "growth": "+80%", 
        "platform": "TikTok", "authenticity": "Misleading",
        "engagement": "Very High", "sentiment": "Negative", "reason": "Contradicts decades of dermatological consensus.",
        "insights": "Fearmongering around chemicals drives engagement."
    }
]

def _live_mentions(base_mentions: int, trend_id: int) -> int:
    """
    Simulate real-time motion so the UI updates when polling.
    Deterministic per minute to avoid large jitter.
    """
    now = datetime.now(timezone.utc)
    minute_bucket = now.hour * 60 + now.minute
    swing = ((minute_bucket + trend_id * 7) % 11) - 5  # -5..+5
    factor = 1 + (swing / 100.0)
    return max(0, int(base_mentions * factor))


def _live_growth(base_growth: str, trend_id: int) -> str:
    try:
        base_value = int(base_growth.replace("%", "").replace("+", "").strip())
    except ValueError:
        return base_growth
    now = datetime.now(timezone.utc)
    swing = ((now.minute + trend_id * 3) % 5) - 2  # -2..+2
    value = max(0, base_value + swing)
    return f"+{value}%"


def _project_trend(trend: dict, live: bool = True):
    mentions = _live_mentions(trend["mentions"], trend["id"]) if live else trend["mentions"]
    growth = _live_growth(trend["growth"], trend["id"]) if live else trend["growth"]
    return {
        "id": trend["id"],
        "keyword": trend["keyword"],
        "category": trend["category"],
        "mentions": mentions,
        "growth": growth,
        "platform": trend["platform"],
        "authenticity": trend["authenticity"]
    }


def _query_matches(trend: dict, search: str) -> bool:
    haystack = f'{trend["keyword"]} {trend["category"]} {trend["platform"]} {trend["authenticity"]}'.lower()
    return search.lower() in haystack


def get_all_trends(
    category: Optional[str] = None,
    platform: Optional[str] = None,
    authenticity: Optional[str] = None,
    search: Optional[str] = None,
    live: bool = True,
):
    filtered = mock_trends
    if category and category != "All":
        filtered = [t for t in filtered if t["category"] == category]
    if platform and platform != "All":
        filtered = [t for t in filtered if t["platform"] == platform]
    if authenticity and authenticity != "All":
        filtered = [t for t in filtered if t["authenticity"] == authenticity]
    if search:
        filtered = [t for t in filtered if _query_matches(t, search)]

    return [_project_trend(t, live=live) for t in filtered]

def get_trend_by_id(trend_id: int):
    for t in mock_trends:
        if t["id"] == trend_id:
            return {
                "id": t["id"],
                "keyword": t["keyword"],
                "mentions": t["mentions"],
                "growth": t["growth"],
                "engagement": t["engagement"],
                "sentiment": t["sentiment"],
                "authenticity": t["authenticity"],
                "reason": t["reason"],
                "insights": t["insights"]
            }
    return None

def get_all_categories():
    return [
        {"name": "ENT", "count": 320, "top_issues": ["Tinnitus Therapies", "DIY Castor Oil", "Sinus Rinse"]},
        {"name": "Cardiology", "count": 450, "top_issues": ["HRV Training", "Wearables", "Low-Sodium Supplements"]},
        {"name": "Mental Health", "count": 890, "top_issues": ["Gut-Brain Diets", "Sleep Rings", "Digital Detox"]},
        {"name": "Skin", "count": 650, "top_issues": ["Herbal Skincare", "Anti-Sunscreen Myths", "Ceramide Alternatives"]}
    ]
