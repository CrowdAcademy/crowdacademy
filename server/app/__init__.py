from dotenv import load_dotenv
from flask import Flask
from flask_mongoengine import MongoEngine
from app.config import config



# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config.from_object(config)
db = MongoEngine(app)


# import routers
from app.routes import \
    login, \
    register, get_user, get_users, update_user, delete_user, \
    create_challenge, get_challenge, get_challenges, update_challenge, delete_challenge, \
    create_lesson, get_lesson, get_lessons, update_lesson, delete_lesson


# create the Flask application
app = Flask(__name__)


# Register user routes
app.add_url_rule('/users', 'register_user', register, methods=['POST'])
app.add_url_rule('/users', 'get_users', get_users, methods=['GET'])
app.add_url_rule('/users/<user_id>', 'get_user', get_user, methods=['GET'])
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
app.add_url_rule('/login', 'login', login, methods=['POST'])