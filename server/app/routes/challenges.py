from flask import jsonify, request, Blueprint
from app.models.challenge import Challenge

bp = Blueprint('challenges', __name__)


# Route to create a new challenge
@bp.route("/challenges", methods=["POST"])
def create_challenge():
    data = request.get_json()
    new_challenge = Challenge(title=data.get('title'), description=data.get('description'))
    try:
        new_challenge.save()
        return jsonify({"message": "Challenge created successfully", "challenge": new_challenge}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400


# Route to get all challenges
@bp.route("/challenges", methods=["GET"])
def get_challenges():
    challenges = Challenge.objects().all()
    return jsonify(challenges), 200


# Route to get a specific challenge by ID
@bp.route("/challenges/<challenge_id>", methods=["GET"])
def get_challenge(challenge_id):
    challenge = Challenge.objects(id=challenge_id).first()
    if challenge:
        return jsonify(challenge), 200
    else:
        return jsonify({"message": "Challenge not found"}), 404


# Route to update a challenge by ID
@bp.route("/challenges/<challenge_id>", methods=["PUT"])
def update_challenge(challenge_id):
    data = request.get_json()
    challenge = Challenge.objects(id=challenge_id).first()
    if challenge:
        challenge.title = data.get('title', challenge.title)
        challenge.description = data.get('description', challenge.description)
        try:
            challenge.save()
            return jsonify({"message": "Challenge updated successfully", "challenge": challenge}), 200
        except Exception as e:
            return jsonify({"message": str(e)}), 400
    else:
        return jsonify({"message": "Challenge not found"}), 404


# Route to delete a challenge by ID
@bp.route("/challenges/<challenge_id>", methods=["DELETE"])
def delete_challenge(challenge_id):
    challenge = Challenge.objects(id=challenge_id).first()
    if challenge:
        challenge.delete()
        return jsonify({"message": "Challenge deleted successfully"}), 200
    else:
        return jsonify({"message": "Challenge not found"}), 404
