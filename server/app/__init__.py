# app.py
from dotenv import load_dotenv
from flask import Flask
from flask_mongoengine import MongoEngine
from app.config import config

# Load environment variables from .env file
load_dotenv()

# Create the Flask application
app = Flask(__name__)
app.config.from_object(config)

# Set the MongoDB database name
app.config['MONGODB_SETTINGS'] = {
    'db': 'crowdacademy',
}

# Initialize the MongoEngine
db = MongoEngine(app)

# Import index and login blueprint
from app.routes.index import bp as index_bp
from app.routes.login import bp as login_bp


# Import routers
from app.routes import register, get_user, get_users, \
    update_user, delete_user, create_challenge, get_challenge, \
    get_challenges, update_challenge, delete_challenge, create_lesson, \
    get_lesson, get_lessons, update_lesson, delete_lesson, get_user_account

# Register index route
app.register_blueprint(index_bp)

# Register user routes
app.add_url_rule('/users/register', 'register', register, methods=['POST'])
app.add_url_rule('/users', 'get_users', get_users, methods=['GET'])
app.add_url_rule('/users/account', 'get_user_account', get_user_account, methods=['GET'])
app.add_url_rule('/users/id/<user_id>', 'get_user', get_user, methods=['GET'])
app.add_url_rule('/users/<user_id>', 'update_user', update_user, methods=['PUT'])
app.add_url_rule('/users/<user_id>', 'delete_user', delete_user, methods=['DELETE'])

# Register challenge routes
app.add_url_rule('/challenges', 'create_challenge', create_challenge, methods=['POST'])
app.add_url_rule('/challenges', 'get_challenges', get_challenges, methods=['GET'])
app.add_url_rule('/challenges/<challenge_id>', 'get_challenge', get_challenge, methods=['GET'])
app.add_url_rule('/challenges/<challenge_id>', 'update_challenge', update_challenge, methods=['PUT'])
app.add_url_rule('/challenges/<challenge_id>', 'delete_challenge', delete_challenge, methods=['DELETE'])

# Register lesson routes
app.add_url_rule('/lessons', 'create_lesson', create_lesson, methods=['POST'])
app.add_url_rule('/lessons', 'get_lessons', get_lessons, methods=['GET'])
app.add_url_rule('/lessons/<lesson_id>', 'get_lesson', get_lesson, methods=['GET'])
app.add_url_rule('/lessons/<lesson_id>', 'update_lesson', update_lesson, methods=['PUT'])
app.add_url_rule('/lessons/<lesson_id>', 'delete_lesson', delete_lesson, methods=['DELETE'])

# Authentication routes
app.register_blueprint(login_bp)
