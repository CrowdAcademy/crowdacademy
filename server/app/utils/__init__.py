import re
from flask import current_app
import jwt
from datetime import datetime, timedelta

def generate_token(user):
    payload = {
        'user_id': str(user.id),
        'exp': datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
    }
    secret_key = current_app.config['SECRET_KEY']
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token


# Simple email validation function (replace with more robust validation if needed)
def is_valid_email(email):
    # Regular expression for basic email validation
    email_regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    return bool(re.match(email_regex, email))