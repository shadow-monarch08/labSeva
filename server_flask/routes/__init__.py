from flask import Blueprint
from .extract_data import extract_bp
from .get_overall_data import overall_bp


# List of Blueprints to register in main app
all_blueprints = [extract_bp, overall_bp]