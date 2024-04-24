from bson import InvalidDocument, ObjectId, errors
from flask import jsonify, request, Blueprint
from app.models.user import User
from app.modules.Access import Roles, Permissions, login_required, authorize

bp = Blueprint('account', __name__)


# Route to retrieve user account information
@bp.route("/", methods=["GET"])
@login_required
def get_user_account(user):
    # Return user account information
    return jsonify(user), 200

@bp.route("/update", methods=["PUT"])
@login_required
def update_user_account(user):
    data = request.get_json()
    
    if user:
        try:
            for attribute, value in data.items():

                if attribute == 'username':
                    # Check if the new username is available
                    if User.objects(username=value).first() and value != user.username:
                        return jsonify({"message": "Username already exists"}), 409
                    
                elif attribute == 'email':
                    # Check if the new email is available
                    if User.objects(email=value).first() and value != user.email:
                        return jsonify({"message": "Email already exists"}), 409
                    
                elif attribute == 'password':
                    # Check if new password is different from old password
                    if value == user.password:
                        return jsonify({"message": "New password cannot be the same as the old one"}), 400
                    
                    # Hash the new password before setting it

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
        user.delete()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    