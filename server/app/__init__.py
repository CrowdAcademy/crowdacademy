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
from app.routes.users import register, get_users, get_user_by_id, get_user_by_username, \
    get_user_by_email, update_user_by_id, delete_user_by_id
from app.routes.account import create_user_account, get_user_account, update_user_account, delete_user_account
from app.routes.lessons import create_lesson, get_lesson, get_lessons, update_lesson, delete_lesson
from app.routes.challenges import create_challenge, get_challenge, get_challenges, update_challenge, delete_challenge

# Import resource routes
from app.routes.resources import create_resource, update_resource, delete_resource

# Import feedback routes
from app.routes.challenge_feedback import create_feedback, update_feedback, delete_feedback

# Register account routes
app.add_url_rule('/account/', 'get_user_account', get_user_account, methods=['GET'])
app.add_url_rule('/account/create', 'create_user_account', create_user_account, methods=['POST'])
app.add_url_rule('/account/update', 'update_user_account', update_user_account, methods=['PUT'])
app.add_url_rule('/account/delete', 'delete_user_account', delete_user_account, methods=['DELETE'])

# Register user routes
app.add_url_rule('/users/add', 'register', register, methods=['POST'])
app.add_url_rule('/users', 'get_users', get_users, methods=['GET'])
app.add_url_rule('/users/id/<user_id>', 'get_user_by_id', get_user_by_id, methods=['GET'])
app.add_url_rule('/users/username/<username>', 'get_user_by_username', get_user_by_username, methods=['GET'])
app.add_url_rule('/users/email/<email>', 'get_user_by_email', get_user_by_email, methods=['GET'])
app.add_url_rule('/users/update/<user_id>', 'update_user_by_id', update_user_by_id, methods=['PUT'])
app.add_url_rule('/users/delete/<user_id>', 'delete_user_by_id', delete_user_by_id, methods=['DELETE'])

# Register challenge routes
app.add_url_rule('/challenges/create', 'create_challenge', create_challenge, methods=['POST'])
app.add_url_rule('/challenges', 'get_challenges', get_challenges, methods=['GET'])
app.add_url_rule('/challenges/<challenge_id>', 'get_challenge', get_challenge, methods=['GET'])
app.add_url_rule('/challenges/update/<challenge_id>', 'update_challenge', update_challenge, methods=['PUT'])
app.add_url_rule('/challenges/delete/<challenge_id>', 'delete_challenge', delete_challenge, methods=['DELETE'])

# Register lesson routes
app.add_url_rule('/lessons', 'create_lesson', create_lesson, methods=['POST'])
app.add_url_rule('/lessons', 'get_lessons', get_lessons, methods=['GET'])
app.add_url_rule('/lessons/<lesson_id>', 'get_lesson', get_lesson, methods=['GET'])
app.add_url_rule('/lessons/<lesson_id>', 'update_lesson', update_lesson, methods=['PUT'])
app.add_url_rule('/lessons/<lesson_id>', 'delete_lesson', delete_lesson, methods=['DELETE'])

# Register resource routes
app.add_url_rule('/resources/create', 'create_resource', create_resource, methods=['POST'])
app.add_url_rule('/resources/update/<resource_id>', 'update_resource', update_resource, methods=['PUT'])
app.add_url_rule('/resources/delete/<resource_id>', 'delete_resource', delete_resource, methods=['DELETE'])

# Register feedback routes
app.add_url_rule('/challenges/<challenge_id>/feedback/create', 'create_feedback', create_feedback, methods=['POST'])
app.add_url_rule('/challenges/feedback/update/<challenge_id>/<feedback_id>', 'update_feedback', update_feedback, methods=['PUT'])
app.add_url_rule('/challenges/feedback/delete/<challenge_id>/<feedback_id>', 'delete_feedback', delete_feedback, methods=['DELETE'])

# Authentication routes
app.register_blueprint(login_bp)

# Register index route
app.register_blueprint(index_bp)
