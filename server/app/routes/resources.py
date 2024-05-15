import os
from mongoengine import DoesNotExist
from app.models.resource import Resource
from app.modules.Media import MediaManager
from flask import jsonify, request, Blueprint
from app.modules.Access import login_required, authorize, Permissions
from werkzeug.utils import secure_filename
from app.models.resource import ResourceType
from app.utils.custom_exceptions import UnsupportedMediaTypeError



# Function to check if the file extension is allowed
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp4', 'avi', 'mkv', 'mov', 'mp3', 'wav', 'flac'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


bp = Blueprint('resources', __name__)

# Get the current directory's base path
base_path = os.getcwd()

# Combine with 'uploads' folder
UPLOAD_FOLDER = os.path.join(base_path, 'uploads')



# Route to retrieve all resources
@bp.route("/resources", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_RESOURCE])
def get_all_resources(current_user):
    try:
        resources = Resource.objects.all()
        return jsonify({"resources": resources}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Route to retrieve resource details
@bp.route("/resources/<resource_id>", methods=["GET"])
@login_required
@authorize([Permissions.VIEW_RESOURCE])
def get_resource_by_id(current_user, resource_id):
    try:
        resource = Resource.objects.get(id=resource_id)
        return jsonify({"resource": resource}), 200
    except DoesNotExist:
        return jsonify({"error": "Resource not found"}), 404


# Route to create a new resource
@bp.route("/resources/create", methods=["POST"])
@login_required
@authorize([Permissions.CREATE_RESOURCE])
def create_resource(current_user):
    try:
        # Check if the request contains a file
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']

        # Check if the file is empty
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Save the file to the uploads folder
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
        else:
            return jsonify({"error": "Invalid file type"}), 400

        # Use MediaManager to upload media and get URL
        media_manager = MediaManager()

        resource_type = request.form.get('resource_type')

        if resource_type not in [ResourceType.IMAGE.value, ResourceType.AUDIO.value, ResourceType.VIDEO.value]:
            os.remove(file_path)  # Remove the file from the temporary folder
            return jsonify({"error": "Invalid resource type"}), 400

        result = media_manager.upload_media(file_path, filename, resource_type)

        # Remove the file from the temporary folder
        os.remove(file_path)

        if result and result.get("url"):
            # Create new Resource object
            new_resource = Resource(
                resource_type=resource_type,
                link=result["url"],
                access_id=result["id"],
                description=request.form.get('description', ''),
                user_ids=[]
            )

            # Save the new resource
            new_resource.save()
            return jsonify({"message": "Resource created successfully", "resource": new_resource}), 201
        else:
            return jsonify({"error": "Failed to upload media"}), 500

    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route to update a resource
@bp.route("/resources/update/<resource_id>", methods=["PUT"])
@login_required
@authorize([Permissions.EDIT_RESOURCE])
def update_resource(current_user, resource_id):
    data = request.get_json()

    try:
        resource = Resource.objects.get(id=resource_id)

    except Resource.DoesNotExist:
        return jsonify({"error": "Resource not found"}), 404

    # Update resource fields
    for attr, value in data.items():
        
        if attr == "link":
            return jsonify({"error": "Resource link can not be modified"}), 400
        
        if attr == "access_id":
            return jsonify({"error": "Resource access_id can not be modified"}), 400   
             
        if attr == "resource_type":
            return jsonify({"error": "Resource resource_type can not be modified"}), 400


        if hasattr(resource, attr):
            setattr(resource, attr, value)

    try:
        # Save the updated resource
        resource.save()
        return jsonify({"message": "Resource updated successfully", "resource": resource}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400



# Route to delete a resource
@bp.route("/resources/delete/<resource_id>", methods=["DELETE"])
@login_required
@authorize([Permissions.DELETE_RESOURCE])
def delete_resource(current_user, resource_id):
    try:
        resource = Resource.objects.get(id=resource_id)
    except Resource.DoesNotExist:
        return jsonify({"error": "Resource not found"}), 404

    media_manager = MediaManager()

    try:
        # Attempt to delete the media from the storage
        media_manager.delete_media(resource.access_id, resource.resource_type.value)
    except UnsupportedMediaTypeError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Failed to delete media: {str(e)}"}), 500

    try:
        # Delete the resource from the database
        resource.delete()
        return jsonify({"message": "Resource deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to delete resource from database: {str(e)}"}), 500
