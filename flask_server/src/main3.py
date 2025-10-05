import google.generativeai as genai
import os
import cv2
import pytesseract
import numpy as np
import pandas as pd

# Windows users: Set the Tesseract path if it's not in system PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\narendra\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"

# 🔑 Replace with your Gemini API Key
API_KEY = "AIzaSyBNX7T4lXU25Avbx7nKj82exgnXIjQhJQU"

# Configure Gemini API
genai.configure(api_key=API_KEY)

# Load Gemini Pro model
model = genai.GenerativeModel("gemini-pro")

# Load image using OpenCV
image = cv2.imread("../images/sample_image5.png")

# Convert to grayscale (improves OCR accuracy)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply thresholding (improves contrast)
gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

# Optionally apply a slight blur to reduce noise
gray = cv2.GaussianBlur(gray, (3, 3), 0)

# Save the processed image (for debugging)
cv2.imwrite("../images/processed_image5.png", gray)

# Extract text using Tesseract OCR
text = pytesseract.image_to_string(gray, lang="eng")

prompt = f"""
Extract structured data from the following medical report text.
Format the output as a JSON with 'Test Name', 'Result', 'Reference Range', and 'Unit'.

{text}
"""

response = model.generate_content(prompt)

print(response.text)




