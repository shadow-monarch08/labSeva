import cv2
import pytesseract
import numpy as np
import pandas as pd
import re
import scispacy
import spacy

# Load the pre-trained biomedical NLP model
nlp = spacy.load("en_core_sci_sm")

# Windows users: Set the Tesseract path if it's not in system PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\narendra\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"

# Load image using OpenCV
image = cv2.imread("../images/sample_image2.png")

# Convert to grayscale (improves OCR accuracy)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply thresholding (improves contrast)
gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

# Optionally apply a slight blur to reduce noise
gray = cv2.GaussianBlur(gray, (3, 3), 0)

# Save the processed image (for debugging)
cv2.imwrite("../images/processed_image2.png", gray)

# Extract text using Tesseract OCR
text = pytesseract.image_to_string(gray, lang="eng")

# print(text)

pattern = re.compile(r"([\w\s/()]+?)\s+([\d\.]+)\s+([\d\.-]+)?\s*([a-zA-Z/%]*)")

# Step 1: Define common test names and possible variations
# test_names = {
#     "Haemoglobin": ["Haemoglobin", "Hemoglobin", "Hemoglobin (Hb)"],
#     "Total Leucocyte Count": ["Total Leucocyte Count", "Total WBC count"],
#     "Neutrophils": ["Neutrophils"],
#     "Lymphocytes": ["Lymphocytes"],
#     "Platelet Count": ["Platelet Count"],
#     "Total RBC count": ["Total RBC count", "RBC Count"],
#     "PCV": ["Packed Cell Volume (PCV)"],
#     "MCV": ["Mean Corpuscular Volume (MCV)"],
#     "MCH": ["MCH"],
#     "MCHC": ["MCHC"],
#     "Eosinophils": ["Eosinophils"],
#     "Monocytes": ["Monocytes"],
#     "Basophils": ["Basophils"]
# }

# Step 2: Create an empty dictionary to store extracted data
# blood_report = {}

# Step 3: Define a generalized regex pattern for extracting test values
# pattern = r"([\w\s\(\)-]+?)\s([\d.]+)\s?(Low|High)?\s?([\d.-]+)?\s?-\s?([\d.-]+)?\s?([\w/%]*)?"

# Step 4: Match and extract data
# for match in re.findall(pattern, text):
#     test_name, result, flag, ref_low, ref_high, unit = match
#     test_name = test_name.strip()

    # Try to standardize test name using dictionary mapping
    # for key, variations in test_names.items():
    #     if test_name in variations:
    #         test_name = key
    #         break  # Stop checking further once a match is found

    # Store results in a structured format
    # blood_report[test_name] = {
    #     "Result": float(result),
    #     "Flag": flag if flag else "Normal",
    #     "Reference Range": f"{ref_low}-{ref_high}" if ref_low and ref_high else "N/A",
    #     "Unit": unit.strip() if unit else "N/A"
    # }

# Step 5: Convert to Pandas DataFrame for better visualization
# df = pd.DataFrame.from_dict(blood_report, orient="index")
# print(text)

doc = nlp(text.lower())  # Convert text to lowercase and process

# Dictionary to store extracted results
extracted_data = {}

for match in pattern.finditer(text):
    test_name = match.group(1).strip()
    result_value = match.group(2)
    reference_range = match.group(3) if match.group(3) else None
    unit = match.group(4) if match.group(4) else None

    extracted_data[test_name] = {
        "Result": result_value,
        "Reference Range": reference_range,
        "Unit": unit
    }

# Print extracted structured data
import json
print(json.dumps(extracted_data, indent=4))

# Extract named entities
# for ent in doc.ents:
#     print(f"Entity: {ent.text}, Label: {ent.label_}")

# Display the original and processed images
# cv2.imshow("Original Image", image)
# cv2.imshow("Processed Image", gray)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
