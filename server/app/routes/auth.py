# auth.py
from functools import wraps
import jwt
from flask import current_app, jsonify, request, Blueprint
from app.models.user import User

# Define the blueprint
bp = Blueprint('auth', __name__)

# Define the login route
@bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        user = User.objects(username=data.get("identifier")).first() or User.objects(email=data.get("identifier")).first()
        print(user.username)
        if user and user.check_password(data.get("password")):
            # Assuming you have a function to generate JWT tokens
            token = generate_token(user)
            return jsonify({"message": "Login successful", "token": token}), 200
        else:
            return jsonify({"message": "Invalid email, username, or password"}), 401
    except TypeError as e:
        return jsonify({"error": str(e), "message": "An error occurred"}), 500

# Decorator to check if the user is authenticated
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or len(auth_header.split(" ")) != 2:
            return jsonify({"message": "Invalid authorization header"}), 401
        
        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = payload['user_id']
            user = User.objects(id=user_id).first()
            if not user:
                return jsonify({"message": "User not found"}), 401
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401
    return decorated_function