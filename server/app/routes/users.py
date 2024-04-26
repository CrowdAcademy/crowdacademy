from flask import jsonify, request, Blueprint
from app.models.user import User
from app.modules.Access import Roles, Permissions, login_required, authorize
from app.utils.consts import USER_ROLES, REQUIRED_FIELDS

bp = Blueprint('users', __name__)

from flask import jsonify, Blueprint, request
from app.models.user import User
from app.modules.Access.roles import Roles

bp = Blueprint('users', __name__)


@bp.route("/users/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        required_fields = [REQUIRED_FIELDS.USERNAME, REQUIRED_FIELDS.EMAIL, REQUIRED_FIELDS.PASSWORD, REQUIRED_FIELDS.ROLES]

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Validate the role
        valid_roles = [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR]

        if not data[REQUIRED_FIELDS.ROLES]:
            return jsonify({"error": "Please provide a role"}), 400

        if any(role not in valid_roles for role in data[REQUIRED_FIELDS.ROLES]):
            return jsonify({"error": "Invalid roles specified"}), 400

        if User.objects(username=data[REQUIRED_FIELDS.USERNAME]).first():
            return jsonify({"error": "Username already exists"}), 409
        
        if User.objects(email=data[REQUIRED_FIELDS.EMAIL]).first():
            return jsonify({"error": "Email already exists"}), 409

        # Fetch permissions from the Roles based on the provided role
        permissions = []
        for role in data[REQUIRED_FIELDS.ROLES]:
            if role == USER_ROLES.STUDENT:
                permissions.extend(Roles.STUDENT)
            elif role == USER_ROLES.INSTRUCTOR:
                permissions.extend(Roles.INSTRUCTOR)

        user = User(
            username=data[REQUIRED_FIELDS.USERNAME],
            email=data[REQUIRED_FIELDS.EMAIL],
            password=data[REQUIRED_FIELDS.PASSWORD],
            roles=data[REQUIRED_FIELDS.ROLES],
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
def get_user_by_id(current_user, user_id):
    user = User.objects(id=user_id).first()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "User not found"}), 404

@bp.route("/users/username/<username>", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_USER])
def get_user_by_username(current_user, username):
    user = User.objects(username=username).first()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "User not found"}), 404
    
@bp.route("/users/email/<email>", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_USER])
def get_user_by_email(current_user, email):
    user = User.objects(email=email).first()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": f"User with email: {email} not found"}), 404

@bp.route("/users/<user_id>", methods=["PUT"])
@login_required
@authorize([Permissions.EDIT_USER])
def update_user_by_id(current_user, user_id):
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
def delete_user_by_id(current_user, user_id):
    try:
        user = User.objects(id=user_id).first()
        if user:
            user.delete()
            return jsonify({"message": "User deleted successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
