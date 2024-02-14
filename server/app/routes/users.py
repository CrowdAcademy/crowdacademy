from flask import jsonify, request, Blueprint
from app.models.user import User

bp = Blueprint('users', __name__)

# User-related routes here
def register():
    # Get registration data from request
    data = request.get_json()

    # Check if the required fields are present in the request data
    if "username" not in data or "email" not in data or "password" not in data:
        return jsonify({"message": "Missing required fields"}), 400

    # Check if the username or email already exists in the database
    if User.objects(username=data["username"]).first() or User.objects(email=data["email"]).first():
        return jsonify({"message": "Username or email already exists"}), 409

    # Create a new user object
    user = User(username=data["username"], email=data["email"], password=data["password"])
    
    # Save the user to the database
    user.save()

    return jsonify({"message": "User registered successfully"}), 201

@bp.route("/users", methods=["GET"])
def get_users():
    users = User.objects().all()
    return jsonify(users), 200

@bp.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    user = User.objects(id=user_id).first()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "User not found"}), 404

@bp.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    user = User.objects(id=user_id).first()
    if user:
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        try:
            user.save()
            return jsonify({"message": "User updated successfully", "user": user}), 200
        except Exception as e:
            return jsonify({"message": str(e)}), 400
    else:
        return jsonify({"message": "User not found"}), 404

@bp.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.objects(id=user_id).first()
    if user:
        user.delete()
        return jsonify({"message": "User deleted successfully"}), 200
    else:
        return jsonify({"message": "User not found"}), 404
