from flask import Flask, request, jsonify
from flask_cors import CORS
import random  # Simulating the ML model for now

app = Flask(__name__)
CORS(app)  # Allow frontend to access the API

# Mock database for users (In real projects, use a proper database)
USERS = {
    "alice": "password123",
    "bob": "securepass"
}

@app.route('/validate_login', methods=['POST'])
def validate_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    if username in USERS and USERS[username] == password:
        return jsonify({"success": True, "message": "Login successful"})
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    data = request.json
    required_fields = ["city", "province", "latitude", "longitude", "lease_term", "type", "beds", "baths", "sq_feet", "furnishing", "smoking", "pets"]
    
    # Ensure all required fields are present
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Simulated house price prediction logic
    predicted_price = random.uniform(1000, 5000)  # Replace with ML model
    
    return jsonify({"predicted_price": round(predicted_price, 2)})

if __name__ == '__main__':
    app.run(debug=True)
