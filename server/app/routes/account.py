from flask import jsonify, request, Blueprint
from app.models.user import User
from app.modules.Access import login_required
from app.modules.Access.roles import Roles
from app.utils.consts import REQUIRED_FIELDS, USER_ROLES

bp = Blueprint('account', __name__)


# Route to retrieve user account information
@bp.route("/", methods=["GET"])
@login_required
def get_user_account(user):
    # Return user account information
    return jsonify(user), 200

@bp.route("/create", methods=["POST"])
def create_user_account():
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

@bp.route("/update", methods=["PUT"])
@login_required
def update_user_account(user):
    data = request.get_json()
    
    if user:
        try:
            for attribute, value in data.items():

                if attribute == REQUIRED_FIELDS.USERNAME:
                    # Check if the new username is available
                    if User.objects(username=value).first() and value != user.username:
                        return jsonify({"message": "Username already exists"}), 409
                    
                elif attribute == REQUIRED_FIELDS.EMAIL:
                    # Check if the new email is available  
                    if value == user.email:
                        continue
                    elif User.objects(email=value).first():
                        return jsonify({"message": "Email already exists"}), 409
                  
                elif attribute == REQUIRED_FIELDS.PASSWORD:
                    # Check if new password is different from old password
                    if value == user.password:
                        return jsonify({"message": "New password cannot be the same as the old one"}), 400
                    
                    # Hash the new password before setting it

                elif attribute == REQUIRED_FIELDS.ROLES:
                    return jsonify({"message": "You can not change your own roles"}), 403
                
                elif attribute == REQUIRED_FIELDS.PERMISSIONS:
                    return jsonify({"message": "You can not change your own permissions"}), 403

                setattr(user, attribute, value)

            user.save()
            return jsonify({"message": "User updated successfully", "user": user}), 200
        except Exception as e:
            return jsonify({"message": str(e)}), 400
    else:
        return jsonify({"message": "User not found"}), 404

@bp.route("/delete", methods=["DELETE"])
@login_required
def delete_user_account(user):
    try:

        if USER_ROLES.SUPER_ADMIN in user.roles:
            return jsonify({"error": "Super Admin account can not be deleted"}), 403

        user.delete()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    