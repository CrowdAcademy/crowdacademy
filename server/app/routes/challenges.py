from app.models.resource import Resource
from app.models.feedback import Feedback
from app.models.challenge import Challenge, StatusField
from flask import jsonify, request, Blueprint
from app.modules.Access import login_required, authorize, Permissions
from bson import ObjectId

bp = Blueprint('challenges', __name__)


# Route to create a new challenge
@bp.route("/challenges/create", methods=["POST"])
@login_required
@authorize([Permissions.CREATE_CHALLENGE])
def create_challenge(current_user):
    data = request.get_json()

    # Extract author_id from the current_user object
    author_id = str(current_user.id)
    author_username = str(current_user.username)
    
    try:
        author_avatar = current_user.profile.avatar
    except AttributeError:
        author_avatar = None
    
    # Extract other data from JSON object
    title = data.get('title')
    description = data.get('description')
    tags = data.get('tags', [])

    if "feedback" in data:
        url = request.url_root + f"challenges/feedback/update/<challenge_id>/<feedback_id>"
        return jsonify({"error": f"To update feedback, use: {url}"}), 400

    try:
        # Create new Challenge object
        new_challenge = Challenge(
            title=title,
            description=description,
            status=StatusField.ACTIVE.value,
            author_id=author_id,
            author_username=author_username,
            author_avatar=author_avatar,
            resource_ids=[],
            feedback=[],
            tags=tags,
        )
    
        # Save the new challenge
        new_challenge.save()

        return jsonify({"message": "Challenge created successfully", "challenge": new_challenge}), 201
    
    except Exception as e:
        return jsonify({"error": f"ValidationError: {str(e)}"}), 400
    

# Route to get all challenges
@bp.route("/challenges/", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_CHALLENGE, Permissions.VIEW_FEEDBACK, Permissions.VIEW_RESOURCE])
def get_challenges(current_user):
    challenges = Challenge.objects().all()
    return jsonify(challenges), 200



# Route to get a specific challenge by ID
@bp.route("/challenges/<challenge_id>", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_CHALLENGE, Permissions.VIEW_FEEDBACK, Permissions.VIEW_RESOURCE])
def get_challenge(current_user, challenge_id):
    try:
        if not ObjectId.is_valid(challenge_id):
            return jsonify({"error": "Invalid challenge ID format"}), 400
        
        challenge = Challenge.objects(id=challenge_id).first()
        
        if challenge:
            return jsonify(challenge), 200
        else:
            return jsonify({"error": "Challenge not found"}), 404
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    
# Route to update a challenge by ID
@bp.route("/challenges/update/<challenge_id>", methods=["PUT"])
@login_required
@authorize([Permissions.EDIT_CHALLENGE])
def update_challenge(current_user, challenge_id):
    try:
        if not ObjectId.is_valid(challenge_id):
            return jsonify({"error": "Invalid challenge ID format"}), 400
        
        data = request.get_json()
        
        if "feedback" in data:
            url = request.url_root + f"challenges/feedback/update/{challenge_id}/<feedback_id>"
            return jsonify({"error": f"To update feedback, use: {url}"}), 400
        
        challenge = Challenge.objects(id=challenge_id).first()
        if challenge:
            for attribute, value in data.items():
                setattr(challenge, attribute, value)
            try:
                challenge.save()
                return jsonify({"message": "Challenge updated successfully", "challenge": challenge}), 200
            
            except Exception as e:
                return jsonify({"error": str(e)}), 400
        else:
            return jsonify({"error": "Challenge not found"}), 404
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    


# Route to delete a challenge by ID
@bp.route("/challenges/delete/<challenge_id>", methods=["DELETE"])
@login_required
@authorize([Permissions.DELETE_CHALLENGE])
def delete_challenge(current_user, challenge_id):
    try:
        if not ObjectId.is_valid(challenge_id):
            return jsonify({"error": "Invalid challenge ID format"}), 400
        
        challenge = Challenge.objects(id=challenge_id).first()
        if challenge:
            challenge.delete()
            return jsonify({"message": "Challenge deleted successfully"}), 200
        else:
            return jsonify({"error": "Challenge not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
