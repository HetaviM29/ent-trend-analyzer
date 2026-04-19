import os
import google.generativeai as genai
from openai import OpenAI
from dotenv import load_dotenv
from tools import web_search_tool, literature_tool

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
openai_api_key = os.getenv("OPENAI_API_KEY")

# Use fallback only when explicitly enabled in .env.
# Set ENABLE_FALLBACK=true to use mock output when the API is unavailable.
fallback_enabled = os.getenv("ENABLE_FALLBACK", "false").lower() in ("1", "true", "yes")

gemini_model = None
openai_client = None
api_init_error = None

if openai_api_key:
    try:
        openai_client = OpenAI(api_key=openai_api_key)
        print("OpenAI API key loaded and client initialized.")
    except Exception as e:
        api_init_error = f"OpenAI API initialization failed: {e}"
        print(api_init_error)
elif gemini_api_key:
    try:
        genai.configure(api_key=gemini_api_key)
        gemini_model = genai.GenerativeModel("models/gemini-2.5-flash")
        print("Gemini API key loaded and model initialized.")
    except Exception as e:
        api_init_error = f"Gemini API initialization failed: {e}"
        print(api_init_error)
else:
    api_init_error = "Neither OPENAI_API_KEY nor GEMINI_API_KEY found in .env"
    print(api_init_error)


def mock_llm_response(prompt, error=None):
    if "ACTION:" in prompt and "INPUT:" in prompt:
        return "ACTION: FINAL\nINPUT: mock"

    if "Generate structured output in JSON" in prompt:
        return '{"trend":"Herbal skincare is gaining traction","category":"Beauty & Wellness","insight":"Consumers are moving toward natural ingredients and clean skincare routines.","product_idea":"A plant-based herbal skincare starter set","marketing_strategy":"Influencer reviews, educational content on herbal benefits, and community wellness campaigns","risk_level":"Medium - requires product safety validation"}'

    if error:
        return f"LLM fallback active. Error: {error}"

    return "LLM fallback active. No API key or the model could not be initialized."


def call_llm(prompt):
    if openai_client:
        try:
            response = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            print("OpenAI API call failed:", str(e))
            if fallback_enabled:
                return mock_llm_response(prompt, error=str(e))
            raise RuntimeError(f"OpenAI API call failed: {e}")

    if gemini_model:
        try:
            response = gemini_model.generate_content(prompt)
            return response.text if response.text else "No response"
        except Exception as e:
            print("Gemini API call failed:", str(e))
            if fallback_enabled:
                return mock_llm_response(prompt, error=str(e))
            raise RuntimeError(f"Gemini API call failed: {e}")

    error_message = api_init_error or "No AI API is initialized."
    print(error_message)
    if fallback_enabled:
        return mock_llm_response(prompt, error=error_message)
    raise RuntimeError(error_message)


def decide_action(context):
    prompt = f"""
    You are an intelligent AI agent.

    Your task is to analyze a health trend and decide next step.

    You can choose:
    1. WEB_SEARCH
    2. LITERATURE
    3. FINAL

    Rules:
    - If you need more data → WEB_SEARCH
    - If you need validation → LITERATURE
    - If enough info → FINAL

    Return ONLY in format:
    ACTION: <WEB_SEARCH / LITERATURE / FINAL>
    INPUT: <query or summary>

    Context:
    {context}
    """

    return call_llm(prompt)


def generate_final(context):
    prompt = f"""
    Based on the following analysis:

    {context}

    Generate structured output in JSON:

    {{
      "trend": "",
      "category": "",
      "insight": "",
      "product_idea": "",
      "marketing_strategy": "",
      "risk_level": ""
    }}
    """

    return call_llm(prompt)


def run_agent(user_input):
    context = f"User Input: {user_input}"

    for step in range(4):  # agent loop
        decision = decide_action(context)

        if "WEB_SEARCH" in decision:
            tool_output = web_search_tool(user_input)

        elif "LITERATURE" in decision:
            tool_output = literature_tool(user_input)

        elif "FINAL" in decision:
            return generate_final(context)

        else:
            return "Agent failed to decide."

        # update context
        context += f"\n\nTool Output:\n{tool_output}"

    return generate_final(context)