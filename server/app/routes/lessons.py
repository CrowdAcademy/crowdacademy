# Import necessary modules
from app.models.lesson import Lesson
from app.modules.Access import login_required, authorize, Permissions
from flask import jsonify, request, Blueprint

# Create a Blueprint instance
bp = Blueprint('lessons', __name__)



# Route to create a new lesson
@bp.route("/lessons", methods=["POST"])
@login_required
@authorize([Permissions.CREATE_LESSON])
def create_lesson():
    data = request.get_json()
    new_lesson = Lesson(title=data.get('title'), content=data.get('content'))
    try:
        new_lesson.save()
        return jsonify({"message": "Lesson created successfully", "lesson": new_lesson}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400

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
@bp.route("/lessons/<lesson_id>", methods=["PUT"])
def update_lesson(lesson_id):
    data = request.get_json()
    lesson = Lesson.objects(id=lesson_id).first()
    if lesson:
        lesson.title = data.get('title', lesson.title)
        lesson.content = data.get('content', lesson.content)
        try:
            lesson.save()
            return jsonify({"message": "Lesson updated successfully", "lesson": lesson}), 200
        except Exception as e:
            return jsonify({"message": str(e)}), 400
    else:
        return jsonify({"message": "Lesson not found"}), 404

# Route to delete a lesson by ID
@bp.route("/lessons/<lesson_id>", methods=["DELETE"])
def delete_lesson(lesson_id):
    lesson = Lesson.objects(id=lesson_id).first()
    if lesson:
        lesson.delete()
        return jsonify({"message": "Lesson deleted successfully"}), 200
    else:
        return jsonify({"message": "Lesson not found"}), 404
