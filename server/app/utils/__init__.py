import datetime
import jwt
from flask import current_app

def generate_token(user):
    payload = {
        'user_id': str(user.id),  # Assuming user.id is an ObjectId or a string
        'exp': datetime.utcnow() + datetime.timedelta(hours=1)  # Token expiration time (1 hour from now)
    }
    secret_key = current_app.config['SECRET_KEY']  # Assuming you have a secret key defined in your Flask app config
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token.decode('utf-8')
