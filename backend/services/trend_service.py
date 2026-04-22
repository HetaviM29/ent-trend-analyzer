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

def get_all_trends():
    return [
        {
            "id": t["id"],
            "keyword": t["keyword"],
            "category": t["category"],
            "mentions": t["mentions"],
            "growth": t["growth"],
            "platform": t["platform"],
            "authenticity": t["authenticity"]
        } for t in mock_trends
    ]

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
