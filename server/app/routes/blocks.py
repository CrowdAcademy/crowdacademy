from flask import jsonify, request, Blueprint
from app.models.lesson import Lesson
from bson import ObjectId
from app.modules.Media.MediaManager import MediaManager
from app.models.resource import ResourceType
from app.models.block import Block
from app.modules.Access import login_required, authorize, Permissions


blocks_bp = Blueprint('blocks', __name__)

media_manager = MediaManager()


@blocks_bp.route("/<lesson_id>/blocks/create", methods=["POST"])
@login_required
@authorize(Permissions.CREATE_BLOCK)
def create_block(user, lesson_id):
    data = request.get_json()

    # Find the lesson by its ID
    lesson = Lesson.objects(id=ObjectId(lesson_id)).first()

    if not lesson:
        return jsonify({"error": "Lesson not found"}), 404

    try:

        # If the Block has the type 'resource'
        if data.get("resource"):
            media = data.get("media")
            data["url"] = media["url"]
            data["resource_id"] = media["id"]
            data["type"] = media["type"]
            data["content"] = "Resource Unable To Load"

        # Get the number of blocks in the lesson's blocks list
        num_blocks = len(lesson.blocks)
        
        # Set data["position"] to the number of blocks
        data["position"] = num_blocks

        # Create a new block object
        block = Block(**data)
        
        # Append the new block to the lesson's blocks list
        lesson.blocks.append(block)
        
        # Save the lesson
        lesson.save()

        return jsonify({"message": "Block created successfully", "block": block}), 201
    
    except Exception as e:
        return jsonify({"error": f"Error creating block: {str(e)}"}), 400


@blocks_bp.route("/<lesson_id>/blocks/update/<int:block_pos>", methods=["POST"])
@login_required
def update_block(lesson_id, block_pos):
    data = request.get_json()

    # Find the lesson by its ID
    lesson = Lesson.objects(id=ObjectId(lesson_id)).first()

    if not lesson:
        return jsonify({"error": "Lesson not found"}), 404

    try:
        # Find the block by its position
        block = next((block for block in lesson.blocks if block.position == block_pos), None)

        if not block:
            return jsonify({"error": "Block not found"}), 404

        # Check if the block is a resource
        if block.resource:
            return jsonify({"error": "Cannot update resource blocks"}), 400

        # Update the block's content
        block.content = data.get("content", block.content)  # Only update if content is provided

        # Save the lesson
        lesson.save()

        return jsonify({"message": "Block updated successfully", "block": block}), 200

    except Exception as e:
        return jsonify({"error": f"Error updating block: {str(e)}"}), 400


@blocks_bp.route("/<lesson_id>/blocks/delete/<block_id>", methods=["DELETE"])
@login_required
def delete_block(lesson_id, block_id):
    # Find the lesson by its ID
    lesson = Lesson.objects(id=ObjectId(lesson_id)).first()

    if not lesson:
        return jsonify({"error": "Lesson not found"}), 404

    try:
        # Find the block by its ID
        block = next((block for block in lesson.blocks if str(block.id) == block_id), None)
        
        if not block:
            return jsonify({"error": "Block not found"}), 404
        
        # Delete media if needed
        if block.resource:
            media_manager.delete_media(block.resource_id, ResourceType[block.type].value)
        
        # Remove the block from the lesson's blocks list
        lesson.blocks.remove(block)
        
        # Save the lesson
        lesson.save()

        return jsonify({"message": "Block deleted successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": f"Error deleting block: {str(e)}"}), 400
