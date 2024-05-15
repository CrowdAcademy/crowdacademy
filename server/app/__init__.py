from dotenv import load_dotenv
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS

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

# Add CORS middleware
CORS(app, resources={r"/*": {"origins": "*"}})

# Import blueprints
from app.routes.index import bp as index_bp
from app.routes.login import bp as login_bp
from app.routes.resources import bp as resources_bp
from app.routes.users import bp as users_bp
from app.routes.account import bp as account_bp
from app.routes.lessons import bp as lessons_bp
from app.routes.challenges import bp as challenges_bp
from app.routes.challenge_feedback import bp as feedback_bp

# Register blueprints
app.register_blueprint(index_bp)
app.register_blueprint(login_bp)
app.register_blueprint(resources_bp)
app.register_blueprint(users_bp)
app.register_blueprint(account_bp)
app.register_blueprint(lessons_bp)
app.register_blueprint(challenges_bp)
app.register_blueprint(feedback_bp)