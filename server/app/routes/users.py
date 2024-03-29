from bson import InvalidDocument, ObjectId  # Import ObjectId from bson module
from flask import jsonify, request, Blueprint
from wtforms import ValidationError
from app.models.user import User
from app.routes.auth import login_required

bp = Blueprint('users', __name__)


# Route to retrieve user account information
@bp.route("/users/account", methods=["GET"])
@login_required
def get_user_account(user):
    # Return user account information
    return jsonify({
        "username": user.username,
        "email": user.email,
    }), 200

@bp.route("/users/register", methods=["POST"])
def register():

    try:
        # Get registration data from request
        data = request.get_json()

        # Check if the required fields are present in the request data
        required_fields = ["username", "email", "password"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Check if username or email already exists in the database
        existing_user = User.objects(username=data["username"]).first()
        existing_email = User.objects(email=data["email"]).first()

        if existing_user:
            return jsonify({"error": "Username already exists"}), 409
        
        if existing_email:
            return jsonify({"error": "Email already exists"}), 409

        # Create a new user object
        user = User(
            username=data["username"],
            email=data["email"],
            password=data["password"]
        )

        # Save the user to the database
        user.save()

        # Return success message with the user's ID
        return jsonify({"message": "User registered successfully", "user_id": str(user.id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# User retrieval route
@bp.route("/users/id/<string:user_id>", methods=["GET"])
def get_user(user_id):
    try:
        # Attempt to convert user_id to ObjectId
        user_id = ObjectId(user_id)
    except Exception as e:
        # Return an error response if user_id is not a valid ObjectId
        return jsonify({"error": "Invalid user ID"}), 400

    # Retrieve the user from the database
    user = User.objects(id=user_id).first()

    # Check if the user exists
    if user:
        # Return the user data
        return jsonify({
            "username": user.username,
            "email": user.email,
            "user_id": str(user.id)  # Convert ObjectId to string for JSON serialization
        }), 200
    else:
        # Return a message indicating the user was not found
        return jsonify({"message": "User not found"}), 404

@bp.route("/users", methods=["GET"])
def get_users():
    users = User.objects().all()
    return jsonify(users), 200

@bp.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    user = User.objects(_id=user_id).first()
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
    user = User.objects(_id=user_id).first()
    if user:
        user.delete()
        return jsonify({"message": "User deleted successfully"}), 200
    else:
        return jsonify({"message": "User not found"}), 404

@bp.route("/users/username/<username>", methods=["GET"])
def get_user_by_username(username):
    user = User.objects(username=username).first()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "User not found"}), 404
