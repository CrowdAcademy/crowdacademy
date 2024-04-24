from bson import InvalidDocument, ObjectId, errors
from flask import jsonify, request, Blueprint
from wtforms import ValidationError
from app.models.user import User
from app.modules.Access import Roles, Permissions, login_required, authorize

bp = Blueprint('users', __name__)

@bp.route("/users/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        required_fields = ["username", "email", "password", "role"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Validate the role
        role_mapping = {
            "student": Roles.STUDENT,
            "instructor": Roles.INSTRUCTOR
        }
        if data["role"] not in role_mapping:
            return jsonify({"error": "Invalid role specified"}), 400

        if User.objects(username=data["username"]).first():
            return jsonify({"error": "Username already exists"}), 409
        
        if User.objects(email=data["email"]).first():
            return jsonify({"error": "Email already exists"}), 409

        # Fetch permissions from the Roles based on the provided role
        permissions = list(role_mapping[data["role"]])

        user = User(
            username=data["username"],
            email=data["email"],
            password=data["password"],
            roles=[data["role"]],
            permissions=permissions
        )
        user.save()
        return jsonify({"message": "User registered successfully", "user_id": str(user.id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route("/users", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_USER])
def get_users(user):
    try:
        users = User.objects().all()
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route("/users/<user_id>", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_USER])
def get_user_by_id(user, user_id):
    user = User.objects(id=user_id).first()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "User not found"}), 404

@bp.route("/users/username/<username>", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_USER])
def get_user_by_username(user, username):
    user = User.objects(username=username).first()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "User not found"}), 404
    
@bp.route("/users/email/<email>", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_USER])
def get_user_by_email(user, email):
    requested_user = User.objects(email=email).first()
    if requested_user:
        return jsonify(requested_user), 200
    else:
        return jsonify({"message": f"User with email: {email} not found"}), 404

@bp.route("/users/<user_id>", methods=["PUT"])
@login_required
@authorize([Permissions.EDIT_USER])
def update_user_by_id(user_id):
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
@login_required
@authorize([Permissions.DELETE_USER])
def delete_user_by_id(user_id):
    try:
        user = User.objects(id=user_id).first()
        if user:
            user.delete()
            return jsonify({"message": "User deleted successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
