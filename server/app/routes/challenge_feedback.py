# feedback.py
from bson import ObjectId
from app.models.challenge import Challenge
from flask import jsonify, request, Blueprint
from app.modules.Access import login_required, authorize, Permissions

bp = Blueprint('feedback', __name__)



# Route to create feedback for a challenge
@bp.route("/feedback/challenges/<challenge_id>/feedback/create", methods=["POST"])
@login_required
@authorize([Permissions.CREATE_FEEDBACK])
def create_feedback(current_user, challenge_id):
    try:
        if not ObjectId.is_valid(challenge_id):
            return jsonify({"error": "Invalid challenge ID format"}), 400
        
        data = request.get_json()
        challenge = Challenge.objects(id=challenge_id).first()
        
        if challenge:
            feedback_data = {
                "student_id": current_user.id,
                "rating": data.get('rating'),
                "comment": data.get('comment')
            }
            challenge.feedback.append(feedback_data)
            challenge.save()
            return jsonify({"message": "Feedback added successfully", "feedback": feedback_data}), 200
        else:
            return jsonify({"error": "Challenge not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    


# Route to update feedback for a challenge
@bp.route("/feedback/challenges/update/<challenge_id>/<feedback_id>", methods=["PUT"])
@login_required
@authorize([Permissions.EDIT_FEEDBACK])
def update_feedback(current_user, challenge_id, feedback_id):
    try:
        if not (ObjectId.is_valid(challenge_id) and ObjectId.is_valid(feedback_id)):
            return jsonify({"error": "Invalid challenge or feedback ID format"}), 400
        
        data = request.get_json()
        challenge = Challenge.objects(id=challenge_id).first()
        
        if challenge:
            feedback = next((fb for fb in challenge.feedback if str(fb.id) == feedback_id), None)
            
            if feedback:
                if feedback.student_id != current_user.id:
                    return jsonify({"error": "You are not authorized to update this feedback"}), 403
                
                feedback.rating = data.get('rating', feedback.rating)
                feedback.comment = data.get('comment', feedback.comment)
                challenge.save()
                return jsonify({"message": "Feedback updated successfully", "feedback": feedback}), 200
            else:
                return jsonify({"error": "Feedback not found"}), 404
        else:
            return jsonify({"error": "Challenge not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    


# Route to delete feedback for a challenge
@bp.route("/feedback/challenges/delete/<challenge_id>/<feedback_id>", methods=["DELETE"])
@login_required
@authorize([Permissions.DELETE_FEEDBACK])
def delete_feedback(current_user, challenge_id, feedback_id):
    try:
        if not (ObjectId.is_valid(challenge_id) and ObjectId.is_valid(feedback_id)):
            return jsonify({"error": "Invalid challenge or feedback ID format"}), 400
        
        challenge = Challenge.objects(id=challenge_id).first()
        
        if challenge:
            feedback = next((fb for fb in challenge.feedback if str(fb.id) == feedback_id), None)
            
            if feedback:
                if feedback.student_id != current_user.id:
                    return jsonify({"error": "You are not authorized to delete this feedback"}), 403
                
                challenge.feedback.remove(feedback)
                challenge.save()
                return jsonify({"message": "Feedback deleted successfully"}), 200
            else:
                return jsonify({"error": "Feedback not found"}), 404
        else:
            return jsonify({"error": "Challenge not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
