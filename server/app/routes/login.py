# routes/login.py
from flask import jsonify, Blueprint, request
from app.models.user import User
from app.modules.Access import login


# Define the blueprint
bp = Blueprint('login', __name__)

# Define the login route
@bp.route("/login", methods=["POST"])
def login_route():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        
        # Attempt login
        token = login(username, password)
        
        if token:
            return jsonify({"message": "Login successful", "token": token}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred"}), 500
