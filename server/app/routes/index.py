# routes/index.py
from flask import jsonify, Blueprint
from app.routes.auth import login_required

bp = Blueprint('index', __name__)



@bp.route("/")
def index():
    return jsonify({"message": "Success"})

# Defining the protected route
@bp.route("/protected", methods=["GET"])
@login_required
def protected_route(user):
    return jsonify({"message": "Access granted. Hello, {}!".format(user.username)})
