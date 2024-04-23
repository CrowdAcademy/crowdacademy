# routes/index.py
from flask import jsonify, Blueprint
from app.modules.Access import login_required, Permissions

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
@login_required(permissions=[Permissions.VIEW_USER, Permissions.EDIT_USER])
def restricted_route(user):
    # This route is only accessible to users with VIEW_USER and EDIT_USER permissions
    return jsonify({"message": "This is a restricted route!"}), 200
