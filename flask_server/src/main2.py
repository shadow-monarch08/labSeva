import re
import spacy
import torch
from transformers import AutoModelForTokenClassification, AutoTokenizer, pipeline
import cv2
import pytesseract
import numpy as np
import pandas as pd


# Load SpaCy's medical model (or use en_core_web_sm for general use)
nlp = spacy.load("en_core_sci_sm")  # Change to "en_core_sci_md" for biomedical processing

# Load a pre-trained BioBERT model for NER
MODEL_NAME = "d4data/biobert-medical-ner"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForTokenClassification.from_pretrained(MODEL_NAME)
ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")


# Function to clean and normalize text
def preprocess_text(text):
    text = text.replace("\n", " ").replace("\t", " ")
    text = re.sub(r"[^a-zA-Z0-9.,/%-]", " ", text)  # Keep important characters
    return text


# Function to extract test values using regex patterns
def extract_test_values(text):
    pattern = r"([A-Za-z\s/]+)\s([\d.]+)\s?([-–\d.]+)?\s?([a-zA-Z/%]+)?"  # Matches test name, value, range, unit
    matches = re.findall(pattern, text)

    results = {}
    for match in matches:
        test_name = match[0].strip()
        value = match[1].strip()
        ref_range = match[2].strip() if match[2] else None
        unit = match[3].strip() if match[3] else None

        results[test_name] = {"Result": value, "Reference Range": ref_range, "Unit": unit}
    
    return results


# Function to apply Named Entity Recognition (NER) using BioBERT
def extract_named_entities(text):
    entities = ner_pipeline(text)
    extracted_entities = {}
    
    for entity in entities:
        label = entity["entity_group"]
        word = entity["word"]
        if label not in extracted_entities:
            extracted_entities[label] = []
        extracted_entities[label].append(word)
    
    return extracted_entities


# Function to apply dependency parsing with SpaCy
def extract_relationships(text):
    doc = nlp(text)
    relationships = []

    for token in doc:
        if token.dep_ in ["nsubj", "attr", "dobj"]:  # Extract key relationships
            relationships.append((token.text, token.dep_, token.head.text))
    
    return relationships


# Main function to process medical report text
def process_medical_report(text):
    cleaned_text = preprocess_text(text)

    # Extract values using regex
    test_values = extract_test_values(cleaned_text)

    # Extract medical terms using BioBERT NER
    named_entities = extract_named_entities(cleaned_text)

    # Extract test relationships using dependency parsing
    relationships = extract_relationships(cleaned_text)

    return {
        "Extracted Values": test_values,
        "Named Entities": named_entities,
        "Dependency Relationships": relationships
    }


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

# Run NLP processing
output = process_medical_report(text)

# Print structured extracted data
import json
print(json.dumps(output, indent=4))
