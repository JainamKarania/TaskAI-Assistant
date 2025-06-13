import os
import google.generativeai as genai

# Configure Gemini API key from .env
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_gemini_response(prompt: str) -> str:
    try:
        # Use the Gemini Flash model
        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

        # Send prompt and get response
        response = model.generate_content(prompt)

        # Return the response text
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
