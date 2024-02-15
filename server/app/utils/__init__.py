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
