from flask import Flask
from routes import all_blueprints  # Import all blueprints
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Register all routes
for blueprint in all_blueprints:
    app.register_blueprint(blueprint)

CORS(app)


@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
