import logging
from app.modules.Media.GoogleStore import GoogleStore
from app.modules.Media.CloudinaryStore import CloudinaryStore
from app.models.resource import ResourceType
from app.utils.custom_exceptions import UnsupportedMediaTypeError


class MediaManager:

    def __init__(self):
        self.google_store = GoogleStore()
        self.cloudinary_store = CloudinaryStore()

    def upload_media(self, file_path, filename, resource_type):

        if resource_type == ResourceType.IMAGE.value:
            url, access_id = self.google_store.upload_file(file_path, filename)

            return {"url": url, "id": access_id}
        
        elif resource_type in [ResourceType.AUDIO.value, ResourceType.VIDEO.value]:
            url, access_id = self.cloudinary_store.upload_file(file_path)
            
            return {"url": url, "id": access_id}
        
        else:
            raise UnsupportedMediaTypeError(f"Unsupported media type: {resource_type}")
      
    def delete_media(self, file_id_or_public_id, resource_type):

        if resource_type == ResourceType.IMAGE.value:
            success = self.google_store.delete_file(file_id_or_public_id)

        elif resource_type in [ResourceType.AUDIO.value, ResourceType.VIDEO.value]:
            success = self.cloudinary_store.delete_file(file_id_or_public_id)

        else:
            raise UnsupportedMediaTypeError(f"Unsupported media type: {resource_type}")

        if not success:
            raise Exception(f"Failed to delete media with ID: {file_id_or_public_id}")
                      
    def update_media_metadata(self, file_id, new_metadata, resource_type):

        if resource_type == ResourceType.IMAGE.value:
            return self.google_store.update_metadata(file_id, new_metadata)
        
        elif resource_type in [ResourceType.AUDIO.value, ResourceType.VIDEO.value]:
            raise UnsupportedMediaTypeError(f"Updating metadata not supported for media type: {resource_type}")
        
        else:
            raise UnsupportedMediaTypeError(f"Unsupported media type: {resource_type}")
