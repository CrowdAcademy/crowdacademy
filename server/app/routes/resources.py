import pytz
import datetime
from flask import jsonify, request, Blueprint
from app.modules.Access import login_required, authorize, Permissions
from app.modules.Media import upload_file
from app.models.resource import Resource

bp = Blueprint('resources', __name__)

# Route to create a new resource
@bp.route("/resources/create", methods=["POST"])
@login_required
def create_resource(current_user):
    try:
        data = request.get_json()
        
        # Check if 'file' is present in request.files
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        
        # Upload file using Media module
        media_url = upload_file(file)
        
        # Create Resource object
        new_resource = Resource(
            resource_type=data.get('resource_type'),
            link=media_url,
            description=data.get('description'),
            user_ids=[current_user.id]  # Assuming user ID is needed
        )
        
        # Save the new resource
        new_resource.save()

        return jsonify({"message": "Resource created successfully", "resource": new_resource}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Route to update a resource by ID
@bp.route("/resources/update/<resource_id>", methods=["PUT"])
@login_required
def update_resource(current_user, resource_id):
    try:
        data = request.get_json()
        
        # Fetch resource by ID
        resource = Resource.objects.get(id=resource_id)
        
        # Update resource fields
        for key, value in data.items():
            setattr(resource, key, value)
        
        # Save the updated resource
        resource.save()

        return jsonify({"message": "Resource updated successfully", "resource": resource}), 200
    except Resource.DoesNotExist:
        return jsonify({"error": "Resource not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Route to delete a resource by ID
@bp.route("/resources/delete/<resource_id>", methods=["DELETE"])
@login_required
def delete_resource(current_user, resource_id):
    try:
        # Fetch resource by ID
        resource = Resource.objects.get(id=resource_id)
        
        # Delete the resource
        resource.delete()

        return jsonify({"message": "Resource deleted successfully"}), 200
    except Resource.DoesNotExist:
        return jsonify({"error": "Resource not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
