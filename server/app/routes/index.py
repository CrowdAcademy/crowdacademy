# routes/index.py
import os
from app.models.user import User
from flask import jsonify, Blueprint
from app.modules.Access import login_required, authorize, Permissions, Roles



bp = Blueprint('index', __name__)

@bp.route("/")
def index():
    return jsonify({"message": "Success"})

# Defining the protected route
@bp.route("/protected", methods=["GET"])
@login_required
def protected_route(user):
    return jsonify({"message": "Access granted. Hello, {}!".format(user.username)})

@bp.route("/restricted", methods=["GET"])
@login_required
@authorize(required_permissions=[Permissions.VIEW_USER])
def restricted_route(user):
    # This route is only accessible to users with VIEW_USER and EDIT_USER permissions
    return jsonify({"message": "This is a restricted route!"}), 200

@bp.route("/create-super-admin", methods=["POST"])
def create_super_admin():
    try:
        # Retrieve super admin credentials from environment variables
        username = os.environ.get("SUPER_ADMIN_USERNAME")
        email = os.environ.get("SUPER_ADMIN_EMAIL")
        password = os.environ.get("SUPER_ADMIN_PASSWORD")

        if not username or not email or not password:
            return jsonify({"error": "Environment variables not set properly"}), 500

        # Check if the user already exists
        existing_user = User.objects(username=username).first()
        if existing_user:
            return jsonify({"message": "Super Admin Username already exists"}), 409
        
        # Check if the email already exists
        existing_email = User.objects(email=email).first()
        if existing_email:
            return jsonify({"message": "Super Admin Email already exists"}), 409
        
        SUPER_ADMIN_ROLE = "super_admin"

        # Create a new super admin user
        user = User(
            username=username,
            email=email,
            password=password,
            roles=[SUPER_ADMIN_ROLE],
            permissions=Roles.__dict__[SUPER_ADMIN_ROLE.upper()]
        )

        # Save the user to the database
        user.save()

        return jsonify({"message": "Super admin created successfully", "user_id": str(user.id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500