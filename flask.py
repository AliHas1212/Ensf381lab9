from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS so frontend can access the API

# Predefined user credentials
USER_CREDENTIALS = {
    "alice": "password123",
    "bob": "secure456",
    "charlie": "qwerty789",
    "diana": "hunter2",
    "eve": "passpass",
    "frank": "letmein",
    "grace": "trustno1",
    "heidi": "admin123",
    "ivan": "welcome1",
    "judy": "password1"
}

# Load the Random Forest model
try:
    model = joblib.load("./src/random_forest_model.pkl")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


@app.route("/validate_login", methods=["POST"])
def validate_login():
    """
    Validates user login credentials.
    """
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    if username in USER_CREDENTIALS and USER_CREDENTIALS[username] == password:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401


@app.route("/predict_house_price", methods=["POST"])
def predict_house_price():
    """
    Predicts house rental price based on input data.
    """
    if model is None:
        return jsonify({"success": False, "message": "Model not loaded"}), 500

    data = request.json

    required_fields = ['city', 'province', 'latitude', 'longitude', 'lease_term',
                       'type', 'beds', 'baths', 'sq_feet', 'furnishing', 'smoking', 'pets']
    
    # Check for missing fields
    for field in required_fields:
        if field not in data:
            return jsonify({"success": False, "message": f"Missing field: {field}"}), 400

    try:
        cats = 'pets' in data and data['pets']
        dogs = 'pets' in data and data['pets']

        sample_data = [
            data['city'],
            data['province'],
            float(data['latitude']),
            float(data['longitude']),
            data['lease_term'],
            data['type'],
            float(data['beds']),
            float(data['baths']),
            float(data['sq_feet']),
            data['furnishing'],
            data['smoking'],
            cats,
            dogs
        ]

        sample_df = pd.DataFrame([sample_data], columns=[
            'city', 'province', 'latitude', 'longitude', 'lease_term',
            'type', 'beds', 'baths', 'sq_feet', 'furnishing',
            'smoking', 'cats', 'dogs'
        ])

        predicted_price = model.predict(sample_df)
        return jsonify({"success": True, "predicted_price": float(predicted_price[0])})

    except Exception as e:
        return jsonify({"success": False, "message": f"Prediction error: {e}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
