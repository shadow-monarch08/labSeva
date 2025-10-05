from flask import Blueprint, jsonify, request, current_app
# import cv2
# import pytesseract
# import numpy as np
# import pandas as pd
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json
from PIL import Image

# Create a Blueprint
extract_bp = Blueprint('extract_data', __name__) 

# Load environment variables from .env file
load_dotenv()

API_KEY = os.getenv("API_KEY")
    
# Configure Gemini API
genai.configure(api_key=API_KEY)

# Load Gemini Pro model
model = genai.GenerativeModel("gemini-2.0-flash")

def extract_text(fileName) :
    file_path = os.path.join(current_app.root_path, 'uploads', fileName)
    # Windows users: Set the Tesseract path if it's not in system PATH
    # pytesseract.pytesseract.tesseract_cmd = r"C:\Users\narendra\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"

    # # Load image using OpenCV
    # image = cv2.imread(file_path)

    # # Convert to grayscale (improves OCR accuracy)
    # gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # # Apply thresholding (improves contrast)
    # gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    # # Optionally apply a slight blur to reduce noise
    # gray = cv2.GaussianBlur(gray, (3, 3), 0)

    # # Extract text using Tesseract OCR
    # text = pytesseract.image_to_string(gray, lang="eng")

    image = Image.open(file_path)
    
    response = model.generate_content(
        contents=['Extract text from the given image', image]
    )
    
    # Close the image before deleting
    image.close()
    
    os.remove(file_path)
    
    text = response.text

    return text

prompt2 = """ 
    Objective:
    Extract structured blood test data, analyze individual test results, calculate an overall health score (0-100 scale), determine a health status, and provide detailed recommendations for improvement.

    Instructions for AI:
    1. Extract Test Data (Structured JSON Output)
    For each test in the medical report, extract the following:

    Test_Name (string): The name of the medical test.
    Result (string): The exact numeric or qualitative value of the test result.
    Ensure status indicators (e.g., 'Low', 'High', 'Normal') are NOT mistaken as part of the result.
    Reference_Range (string): The normal range for the test (if available).
    If missing, infer an appropriate range using standard medical references.
    Ensure the range is formatted as "lower-limit - upper-limit".
    Convert improperly formatted values (e.g., "less than 5" → "0 - 5", "greater than 3" → "3 - upper-limit").
    Unit (string): The measurement unit.
    If missing, infer the most medically accepted unit based on the test type.
    Status (string): Categorize the test result as 'Low', 'Normal', or 'High' based on the reference range.
    If explicitly stated in the report, use that value.
    Otherwise, determine the status by comparing the result with the reference range.
    Health_Impact (string): Explain the effect of abnormal results, including:
    Impact on bodily functions
    Symptoms & potential risks
    Possible related diseases
    If the result is Normal, return "Within normal range, no health concerns."
    Dietary_Recommendations (object):
    Foods_to_Consume (array): List specific foods (e.g., "milk", "salmon", "spinach") that improve low values.
    Foods_to_Avoid (array): List specific foods (e.g., "red meat", "processed cheese") to limit if values are high.
    2. Score Individual Tests (0-10 Scale Per Test)
    Assign 10 points if the result is within the reference range.
    If out of range, calculate a score based on the degree of deviation.
    Ensure a minimum score of 1, even for minor abnormalities.
    3. Apply Weightage Per Test
    Assign a clinical weight to each test based on its importance.
    Example weight distribution (ensuring total = 1.0):
    
    "Hemoglobin": 0.15,
    "WBC Count": 0.10,
    "Platelet Count": 0.08,
    "RBC Count": 0.10,
    "MCV": 0.07,
    "MCH": 0.06,
    "MCHC": 0.06,
    "Hematocrit": 0.08,
    "Neutrophils": 0.05,
    "Lymphocytes": 0.05,
    "Eosinophils": 0.04,
    "Monocytes": 0.04,
    "Basophils": 0.02
    
    4. Compute the Final Health Score (0-100 Scale)
    Use a weighted sum formula to combine test scores.
    Normalize the final score to a 0-100 scale for precision.
    5. Determine Overall Health Status
    90-100 → Excellent (Optimal health, no concerns)
    75-89 → Good (Minor deviations, mostly healthy)
    50-74 → Moderate (Needs improvement, potential risks)
    Below 50 → Poor (Significant concerns, seek medical attention)
    6. Provide Detailed Insights & Recommendations
    Key Factors Affecting Score: Identify which tests contributed negatively.
    Health Impact: Explain how deviations affect the body.
    Dietary & Lifestyle Recommendations: Suggest specific actions to improve overall health.
    🚨 Additional Processing Guidelines
    ✅ Ensure Correct Extraction of Numerical Values
    Example: 'Calcium 8.5 mg/dL (Low)' →
    "Test_Name": "Calcium", "Result": "8.5", "Unit": "mg/dL", "Status": "Low" 
    ✅ Convert Reference Ranges into Proper Format

    "less than 5" → "0 - 5"
    "greater than 3" → "3 - upper-limit"
    "normal is above 3.5" → "3.5 - upper-limit"
    ✅ Ensure JSON is Well-Formatted & Parsable

    The final output must be valid JSON that can be used with JSON.parse().
    ✅ Accurately Calculate Health Score & Status

    Ensure scientifically accurate interpretations of results.
    🔹 Example JSON Output
    
    "Tests": 
        
        "Test_Name": "Hemoglobin",
        "Result": "15",
        "Reference_Range": "13 - 17",
        "Unit": "g/dL",
        "Status": "Normal",
        "Health_Impact": "Within normal range, no health concerns.",
        "Dietary_Recommendations": 
            "Foods_to_Consume": ,
            "Foods_to_Avoid": 
        ,
        "Test_Score": 10
        ,
        
        "Test_Name": "WBC Count",
        "Result": "4800",
        "Reference_Range": "5000 - 10000",
        "Unit": "cells/μL",
        "Status": "Low",
        "Health_Impact": "Low WBC count may indicate a weakened immune system, increasing the risk of infections.",
        "Dietary_Recommendations": 
            "Foods_to_Consume": "citrus fruits", "garlic", "almonds", "yogurt",
            "Foods_to_Avoid": 
        ,
        "Test_Score": 5
        
    ,
    "Overall_Score": 75,
    "Health_Status": "Good",
    "Key_Factors_Affecting_Score": "WBC Count (Low)",
    "Health_Impact_Summary": "Your WBC count is lower than the reference range, which may indicate a weakened immune system.",
    "Dietary_Lifestyle_Recommendations": 
        "General_Advice": "Increase intake of immune-boosting foods like garlic, almonds, and citrus fruits. Ensure adequate sleep and reduce stress."
    
    🚀 Key Enhancements in This Prompt
    ✅ Full Medical Report Extraction - Maintains detailed test results.
    ✅ Weighted Scoring System - Assigns clinical importance to each test.
    ✅ Overall Health Score (0-100) - Provides a quantitative measure of health.
    ✅ Accurate Health Status - Categorizes health based on score thresholds.
    ✅ Personalized Health Recommendations - Includes specific dietary & lifestyle tips.

    🚀 This ensures a structured, medically accurate, and actionable health analysis!
"""

prompt3 = """
    Objective:
    Calculate a precise overall health score (0-100 scale) based on multiple blood test results. The AI should analyze individual test results, apply appropriate weightage, determine an overall health status, and provide recommendations.

    Instructions for AI:
    Extract Test Data

    Identify and extract the Test Name, Result Value, Reference Range (Low-High), and Unit.
    If the reference range is missing, infer a valid range based on standard medical guidelines.
    Score Individual Tests (0-10 Scale Per Test)

    If the result is within range, assign 10 points.
    If the result is out of range, calculate a score based on degree of deviation.
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

    Key Factors Affecting Score: List tests with abnormal values.
    Health Impact: Explain how these deviations affect health.
    Dietary & Lifestyle Recommendations: Provide specific actions for improvement.
    Example Calculation Approach (For AI Reference)
    yaml
    Copy
    Edit
    - Hemoglobin: 15 (Range: 13-17) → Score: 10 (Weight: 15%)  
    - WBC Count: 5100 (Range: 4800-10800) → Score: 10 (Weight: 10%)  
    - Lymphocytes: 18 (Range: 20-40) → Score: 7 (Weight: 8%)  
    - MCHC: 35.7 (Range: 31.5-34.5) → Score: 5 (Weight: 8%)  

    Final Score = (10x0.15) + (10x0.10) + (7x0.08) + (5x0.08) + … → Scaled to 0-100  
    Expected Output Format:

    {
    "Overall_Health_Score": 86.75,
    "Health_Status": "Good",
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
    ✅ Actionable Insights: Provides specific dietary & lifestyle advice.
"""

def extract_medical_values(text) :
    
    prompt = f"""
    Extract structured data from the following medical report text.
    Format the output as a valid JSON array, where each object contains the following keys:

    Test_Name (string) - The name of the medical test.

    Result (string) - The exact numeric or qualitative value of the test result as extracted from the report.

    Ensure that any accompanying status indicators (e.g., 'Low', 'High', 'Normal') are not mistaken as part of the result.
    Reference_Range (string) - The normal reference range for the test, if available.

    If the reference range is missing, infer an appropriate range based on medical standards.
    If the reference range is not provided in a proper range format (e.g., only a single threshold or vague description), convert it into the format "lower-limit - upper-limit".
    Always present the reference range as "X - Y" (e.g., "3.5 - 5.5 mmol/L").
    If the report provides values in a non-range format (e.g., "less than 5" or "greater than 3"), deduce a proper lower and upper limit based on standard medical references.
    Unit (string) - The unit of measurement for the test result, if available.

    If missing, provide a medically accepted unit based on the test type.
    Status (string) - Accurately determine whether the result is 'Low', 'Normal', or 'High' based on the reference range.

    If the report explicitly states the status (e.g., "High" or "Low"), use that.
    If not, calculate the status by comparing the Result with the Reference_Range (including inferred values).
    Do not mistake words like 'High', 'Low', or 'Normal' as part of the result value.
    Health_Impact (string) - A detailed explanation of the potential health effects if the result is Low or High. This should include:

    How abnormal levels may impact bodily functions.
    Potential symptoms or risks associated with the condition.
    Possible diseases or disorders related to the test results.
    If the result is Normal, return: "Within normal range, no health concerns."
    Dietary_Recommendations (object) - Contains two keys:

    Foods_to_Consume (array of strings) - List of specific food items (e.g., "milk", "salmon", "spinach", "almonds") that can help improve low values. Avoid using broad categories like "dairy products" or "high-protein foods".
    Foods_to_Avoid (array of strings) - List of specific food items (e.g., "red meat", "processed cheese", "fried foods", "sugary drinks") to limit if the value is high.
    
    🚨 Additional Processing Guidelines:
    ✅ Ensure correct extraction of numerical values
    If a test result is given as 'Calcium 8.5 mg/dL (Low)' or 'Calcium L 8.5 mg/dL', correctly extract:
    DO NOT extract 'Low' or 'L' as part of "Result".
    
    ✅ Convert Reference Ranges into Proper "X - Y" Format
    If given as "less than 5", infer it as "0 - 5".
    If given as "greater than 3", infer it as "3 - upper-limit" (use medical guidelines).
    If given as "normal is above 3.5", infer it as "3.5 - upper-limit".
    If given as "ideal value is 4.5", infer an approximate reference range based on medical guidelines.
    
    ✅ Handle missing reference ranges and units properly
    If the reference range is missing, infer one based on standard medical guidelines.
    If the unit is missing, provide the most commonly accepted unit for the test.
    
    ✅ Ensure JSON is properly formatted
    The final output should be a valid JSON array that can be directly parsed using JSON.parse().
    
    ✅ Correctly distinguish between values and status labels
    Do not mistake "High" or "Low" as part of the test result if they are meant to indicate the status.

    {text}
    """
    
    response = model.generate_content(prompt)
    
    return response.text

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Function to check if file type is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@extract_bp.route('/extract_data', methods=['POST'])
def extract_data():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        upload_folder = os.path.join(current_app.root_path, 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        filepath = os.path.join(upload_folder, file.filename)
        file.save(filepath)
        text = extract_text(file.filename)
        json_data = extract_medical_values(text)
        return jsonify({"extracted_text" : json_data}), 200

    return jsonify({"error": "Invalid file type"}), 400

