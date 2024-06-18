# Import necessary modules
from app.models.lesson import Lesson
from app.modules.Access import login_required, authorize, Permissions
from flask import jsonify, request, Blueprint
from bson import ObjectId



# Create a Blueprint instance
bp = Blueprint('lessons', __name__)



# Route to create a new lesson
@bp.route("/lessons/create", methods=["POST"])
@login_required
@authorize([Permissions.CREATE_LESSON])
def create_lesson(current_user):
    data = request.get_json()

    # Extract instructor_id from the current_user object
    instructor_id = str(current_user.id)
    instructor_username = str(current_user.username)

    try:
        instructor_avatar = current_user.profile.avatar
    except AttributeError:
        instructor_avatar = None
    
    new_lesson = Lesson(
        title=data.get('title'), 
        description=data.get('description'),
        instructor_id=instructor_id,
        instructor_username=instructor_username,
        tags = data.get('tags', []),
        instructor_avatar=instructor_avatar
    )

    try:
        new_lesson.save()
        return jsonify({"success": True, "message": "Lesson created successfully", "lesson": new_lesson}), 201
    
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# Route to get all lessons
@bp.route("/lessons", methods=["GET"])
def get_lessons():
    lessons = Lesson.objects().all()
    return jsonify(lessons), 200

# Route to get a specific lesson by ID
@bp.route("/lessons/<lesson_id>", methods=["GET"])
def get_lesson(lesson_id):
    lesson = Lesson.objects(id=lesson_id).first()
    if lesson:
        return jsonify(lesson), 200
    else:
        return jsonify({"message": "Lesson not found"}), 404

# Route to update a lesson by ID
@bp.route("/lessons/update/<lesson_id>", methods=["PUT"])
@login_required
@authorize([Permissions.EDIT_LESSON])
def update_lesson(current_user, lesson_id):
    try:
        if not ObjectId.is_valid(lesson_id):
            return jsonify({"error": "Invalid lesson ID format"}), 400

        data = request.get_json()
        
        # Check if the data contains any feedback or blocks field
        if "feedback" in data:
            url = request.url_root + f"lessons/feedback/update/{lesson_id}/<feedback_id>"
            return jsonify({"error": f"To update feedback, use: {url}"}), 400
        
        if "blocks" in data:
            return jsonify({"error": "Updating blocks is not allowed through this endpoint"}), 400
        
        lesson = Lesson.objects(id=lesson_id).first()
        if lesson:
            for attribute, value in data.items():
                setattr(lesson, attribute, value)
            try:
                lesson.save()
                return jsonify({"message": "Lesson updated successfully", "lesson": lesson}), 200
            except Exception as e:
                return jsonify({"error": str(e)}), 400
        else:
            return jsonify({"error": "Lesson not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Route to delete a lesson by ID
@bp.route("/lessons/delete/<lesson_id>", methods=["DELETE"])
@login_required
@authorize([Permissions.DELETE_LESSON])
def delete_lesson(current_user, lesson_id):
    lesson = Lesson.objects(id=lesson_id).first()
    if lesson:
        lesson.delete()
        return jsonify({"message": "Lesson deleted successfully"}), 200
    else:
        return jsonify({"message": "Lesson not found"}), 404
