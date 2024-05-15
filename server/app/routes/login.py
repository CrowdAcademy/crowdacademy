from flask import jsonify, Blueprint, request
from app.models.user import User
from app.modules.Access import login_required, login, logout

# Define the blueprint
bp = Blueprint('login', __name__)

# Define the login route
@bp.route("/login", methods=["POST"])
def login_route():
    try:
        data = request.get_json()
        identifier = data.get("identifier")
        password = data.get("password")
        
        # Attempt login using the User model's login function
        token = login(identifier, password)
        
        if token:
            return jsonify({"success": True, "message": "Login successful", "token": token}), 200
        else:
            return jsonify({"message": "Invalid identifier or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred"}), 500

# Define the logout route
@bp.route("/logout", methods=["POST"])
@login_required
def logout_route(user):
    try:
        # Call the logout function from the Access module
        success_message = logout(user)

        return jsonify({"message": success_message}), 200
    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during logout"}), 500
