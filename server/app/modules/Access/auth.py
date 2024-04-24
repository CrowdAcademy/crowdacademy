# Access/auth.py
import jwt
from functools import wraps
from flask import current_app, jsonify, request
from app.models.user import User
from app.modules.Access.roles import Roles
from mongoengine.queryset.visitor import Q

def login(identifier, password):
    # Validate credentials against the database
    user = User.objects(Q(username=identifier) | Q(email=identifier)).first()
    if user and user.check_password(password):
        # Generate authentication token (JWT)
        token = generate_token(user)
        return token
    else:
        return None

def generate_token(user):
    try:
        # Generate JWT token with user information
        payload = {'user_id': str(user.id), 'roles': user.roles}
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        return token
    except Exception as e:
        return str(e)

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

def login_required(f):
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

            return f(user, *args, **kwargs)  # Pass 'user' and other parameters to the decorated function
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
    return decorated_function


def authorize(required_permissions):
    """
    Decorator to authorize a user based on their roles and required permissions.
    
    Args:
        required_permissions (list): A list of permission strings required for the operation.

    Returns:
        function: Decorator function.
    """
    def decorator(f):
        @wraps(f)
        def wrapper(user, *args, **kwargs):  # Ensure the 'user' argument is present
            if not user or not user.roles:  # Adjust to use 'roles' attribute
                return jsonify({"message": "Unauthorized"}), 401
            
            user_roles = user.roles  # Adjust to use 'roles' attribute
            if any(role in user_roles for role in ['super_admin', 'admin']):
                return f(user, *args, **kwargs)  # Pass 'user' to the decorated function
            else:
                return jsonify({"message": "Insufficient permissions"}), 403
        return wrapper
    return decorator

def authorize(required_permissions):
    """
    Decorator to authorize a user based on their roles and required permissions.
    
    Args:
        required_permissions (list): A list of permission strings required for the operation.

    Returns:
        function: Decorator function.
    """
    def decorator(f):
        @wraps(f)
        def wrapper(user, *args, **kwargs):
            if not user or not user.roles:
                return jsonify({"message": "Unauthorized"}), 401
            
            # Accumulate all permissions of user roles
            user_permissions = set()
            for role in user.roles:
                if role.upper() in Roles.__dict__:
                    user_permissions.update(Roles.__dict__[role.upper()])

            # Check if all required permissions are in the accumulated permissions
            if all(permission in user_permissions for permission in required_permissions):
                return f(user, *args, **kwargs)
            else:
                return jsonify({"message": "Insufficient permissions"}), 403
        
        return wrapper
    return decorator
