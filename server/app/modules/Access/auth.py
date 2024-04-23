# Access/auth.py
import jwt
from functools import wraps
from flask import current_app, jsonify, request
from app.models.user import User
from app.modules.Access.roles import Roles

def login(username, password):
    # Validate credentials against the database
    user = User.objects(username=username).first()
    if user and user.check_password(password):
        # Generate authentication token (JWT)
        token = generate_token(user)
        return token
    else:
        return None

def generate_token(user):
    # Generate JWT token with user information
    payload = {'user_id': str(user.id), 'role': user.role}
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token.decode('utf-8')

def decode_token(token):
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = payload['user_id']
        user = User.objects(id=user_id).first()
        return user
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def login_required(permissions=None):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            if not auth_header or len(auth_header.split(" ")) != 2:
                return jsonify({"message": "Invalid authorization header"}), 401
            
            try:
                token = auth_header.split(" ")[1]
                user = decode_token(token)
                if not user:
                    return jsonify({"message": "Invalid token"}), 401

                # Check if the user has the required permissions
                if permissions and not authorize(user, permissions):  # Pass permissions to authorize function
                    return jsonify({"message": "Insufficient permissions"}), 403

                return f(user, *args, **kwargs)
            except jwt.ExpiredSignatureError:
                return jsonify({"message": "Token has expired"}), 401
        return decorated_function
    return decorator

def authorize(user, required_permissions):
    """
    Decorator to authorize a user based on their role and required permissions.
    
    Args:
        required_permissions (list): A list of permission strings required for the operation.

    Returns:
        function: Decorator function.
    """
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            # user = args[0]  # The first argument is assumed to be the user object
            if not user or not user.role:
                return jsonify({"message": "Unauthorized"}), 401
            
            user_role = user.role
            if user_role not in Roles.__dict__:
                return jsonify({"message": "Unauthorized"}), 401

            if all(permission in Roles.__dict__[user_role] for permission in required_permissions):
                return f(*args, **kwargs)
            else:
                return jsonify({"message": "Insufficient permissions"}), 403
        return wrapper
    return decorator