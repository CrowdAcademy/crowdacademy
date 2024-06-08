from flask import jsonify, request, Blueprint
from app.models.challenge import Challenge
from bson import ObjectId
from app.modules.Media.MediaManager import MediaManager
from app.models.resource import ResourceType
from app.models.block import Block
from app.modules.Access import login_required


blocks_bp = Blueprint('blocks', __name__)

media_manager = MediaManager()


@blocks_bp.route("/<challenge_id>/blocks/create", methods=["POST"])
@login_required
def create_block(challenge_id):
    data = request.get_json()

    # Find the challenge by its ID
    challenge = Challenge.objects(id=ObjectId(challenge_id)).first()

    if not challenge:
        return jsonify({"error": "Challenge not found"}), 404

    try:
        # Upload media if needed
        if data.get("resource"):
            media_info = media_manager.upload_media(data.get("file_path"), data.get("filename"), ResourceType[data.get("type")].value)
            data["url"] = media_info["url"]
            data["resource_id"] = media_info["id"]
        
        # Create a new block object
        block = Block(**data)
        
        # Append the new block to the challenge's blocks list
        challenge.blocks.append(block)
        
        # Save the challenge
        challenge.save()

        return jsonify({"message": "Block created successfully", "block": block}), 201
    
    except Exception as e:
        return jsonify({"error": f"Error creating block: {str(e)}"}), 400
    


@blocks_bp.route("/<challenge_id>/blocks/update/<block_id>", methods=["PUT"])
@login_required
def update_block(challenge_id, block_id):
    data = request.get_json()

    # Find the challenge by its ID
    challenge = Challenge.objects(id=ObjectId(challenge_id)).first()

    if not challenge:
        return jsonify({"error": "Challenge not found"}), 404

    try:
        # Find the block by its ID
        block = next((block for block in challenge.blocks if str(block.id) == block_id), None)
        
        if not block:
            return jsonify({"error": "Block not found"}), 404
        
        # Check if the block is a resource
        if block.resource:
            return jsonify({"error": "Cannot update resource blocks"}), 400
        
        # Update the block fields
        for key, value in data.items():
            if hasattr(block, key):
                setattr(block, key, value)
        
        # Save the challenge
        challenge.save()

        return jsonify({"message": "Block updated successfully", "block": block}), 200
    
    except Exception as e:
        return jsonify({"error": f"Error updating block: {str(e)}"}), 400



@blocks_bp.route("/<challenge_id>/blocks/delete/<block_id>", methods=["DELETE"])
@login_required
def delete_block(challenge_id, block_id):
    # Find the challenge by its ID
    challenge = Challenge.objects(id=ObjectId(challenge_id)).first()

    if not challenge:
        return jsonify({"error": "Challenge not found"}), 404

    try:
        # Find the block by its ID
        block = next((block for block in challenge.blocks if str(block.id) == block_id), None)
        
        if not block:
            return jsonify({"error": "Block not found"}), 404
        
        # Delete media if needed
        if block.resource:
            media_manager.delete_media(block.resource_id, ResourceType[block.type].value)
        
        # Remove the block from the challenge's blocks list
        challenge.blocks.remove(block)
        
        # Save the challenge
        challenge.save()

        return jsonify({"message": "Block deleted successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": f"Error deleting block: {str(e)}"}), 400
