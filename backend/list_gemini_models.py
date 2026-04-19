import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

print("Available Gemini models supporting generateContent:")
for m in genai.list_models():
    if 'generateContent' in getattr(m, 'supported_generation_methods', []):
        print(m.name)
