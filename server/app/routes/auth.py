from flask import jsonify, request, Blueprint
from app.models.user import User
from app.utils import generate_token


bp = Blueprint('auth', __name__)

# Authentication-related routes here
@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.objects(email=data.get("email")).first()
    if user and user.check_password(data.get("password")):
        token = generate_token(user)  # Assuming you have a function to generate JWT tokens
        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401
