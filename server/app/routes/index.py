from flask import jsonify, Blueprint

bp = Blueprint('index', __name__)

@bp.route("/")
def index():
    return jsonify({"message": "Success"})
