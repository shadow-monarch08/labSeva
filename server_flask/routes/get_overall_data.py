from flask import Blueprint, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os


overall_bp = Blueprint("get_overall_data", __name__)

load_dotenv()

API_KEY = os.getenv("API_KEY")
    
# Configure Gemini API
genai.configure(api_key=API_KEY)

# Load Gemini Pro model
model = genai.GenerativeModel("gemini-2.0-flash")

prompt3 = """
    Objective:
    Calculate a precise overall health score (0-100 scale) based on multiple blood test results. The AI should analyze individual test results, apply appropriate weightage, determine an overall health status, classify the test type, and provide recommendations.

    Instructions for AI:
    Extract Test Data
    Identify and extract the Test Name, Result Value, Reference Range (Low-High), and Unit.
    If the reference range is missing, infer a valid range based on standard medical guidelines.
    Determine the test category (e.g., CBC, lipid panel, metabolic panel) based on the provided test names.
    Score Individual Tests (0-10 Scale Per Test)
    If the result is within range, assign 10 points.
    If the result is out of range, calculate a score based on the degree of deviation.
    Ensure a minimum score of 1 for all tests to reflect minor abnormalities.
    Apply Weightage Per Test
    Assign a weight to each test based on its clinical importance.
    Example weight distribution (ensuring total = 1.0):
    Hemoglobin (15%), WBC Count (10%), Platelet Count (8%), etc.
    Compute the Final Health Score
    Use a weighted sum formula to aggregate all test scores.
    Normalize the final score to a 0-100 scale for precision.
    Determine Health Status Based on Score:
    90-100 → Excellent (Optimal health, no concerns)
    75-89 → Good (Minor deviations, mostly healthy)
    50-74 → Moderate (Needs improvement, potential risks)
    Below 50 → Poor (Significant concerns, seek medical attention)
    Provide Detailed Insights & Recommendations
    Test Category: Identify which medical panel the test results belong to (e.g., CBC, lipid panel, metabolic panel).
    Key Factors Affecting Score: List tests with abnormal values.
    Health Impact: Explain how these deviations affect health.
    Dietary & Lifestyle Recommendations: Provide specific actions for improvement.
    Example Calculation Approach:
    - Hemoglobin: 15 (Range: 13-17) → Score: 10 (Weight: 15%)  
    - WBC Count: 5100 (Range: 4800-10800) → Score: 10 (Weight: 10%)  
    - Lymphocytes: 18 (Range: 20-40) → Score: 7 (Weight: 8%)  
    - MCHC: 35.7 (Range: 31.5-34.5) → Score: 5 (Weight: 8%)  

    Final Score = (10x0.15) + (10x0.10) + (7x0.08) + (5x0.08) + … → Scaled to 0-100  
    Expected Output Format:
    {
        "Overall_Health_Score": 86.75,
        "Health_Status": "Good",
        "Test_Category": "Complete Blood Count (CBC)",
        "Key_Factors_Affecting_Score": [
            {"Test_Name": "Lymphocytes", "Result": 18, "Reference_Range": "20-40"},
            {"Test_Name": "MCHC", "Result": 35.7, "Reference_Range": "31.5-34.5"}
        ],
        "Health_Impact": "Lymphocyte levels below the normal range may indicate weakened immune function. Elevated MCHC may suggest dehydration or hereditary spherocytosis.",
        "Recommendations": {
            "Dietary": [
                "Consume foods rich in vitamin C (oranges, bell peppers) to support immunity.",
                "Increase water intake to normalize MCHC."
            ],
            "Lifestyle": [
                "Engage in moderate exercise to strengthen the immune system.",
                "Monitor hydration levels regularly."
            ]
        }
    }
    Key Enhancements in This Prompt:
    ✅ Precise Calculations: Uses an exact weighted scoring method.
    ✅ Health Status Included: Gives a clear classification (Excellent, Good, Moderate, Poor).
    ✅ Test Classification Added: Identifies whether the data belongs to CBC, lipid panel, metabolic panel, etc.
    ✅ Actionable Insights: Provides specific dietary & lifestyle advice.

    This version ensures the AI not only calculates health scores but also categorizes the test data, making it more insightful. Let me know if you want further refinements! 🚀
"""

def get_overall_score(text) :
    
    final_prompt = prompt3 + "\n" + text
    
    response = model.generate_content(final_prompt)
    
    return response.text

@overall_bp.route('/get_overall_score', methods=['POST'])
def extract_data():
    try:
        json_data = request.form.get('data')   # Parses JSON-stringified data from request body
        # print(json_data)
        if not json_data:
            return jsonify({"error": "No JSON data received"}), 400
        
        # Process the received data
        # print("Received Data:", data)  # Debugging
        
        data = get_overall_score(json_data)

        return jsonify({"message": "Data received successfully", "final_data" : data}), 200
    
    except Exception as e : 
        return jsonify({"error" : str(e)}), 500
