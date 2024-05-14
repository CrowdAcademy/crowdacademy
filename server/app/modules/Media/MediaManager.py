import logging
from app.modules.Media.GoogleStore import GoogleStore
from app.modules.Media.CloudinaryStore import CloudinaryStore


class MediaManager:
    def __init__(self):
        self.google_store = GoogleStore()
        self.cloudinary_store = CloudinaryStore()

    def upload_media(self, file_path, filename, resource_type):
        if resource_type == 'image':
            url, access_id = self.google_store.upload_file(file_path, filename)
        elif resource_type in ['audio', 'video']:
            url, access_id = self.cloudinary_store.upload_file(file_path)
        else:
            return {"error": "Unsupported media type"}
        return {"url": url, "id": access_id}

    def delete_media(self, file_id_or_public_id, resource_type):
        if resource_type == 'image':
            self.google_store.delete_file(file_id_or_public_id)
        elif resource_type in ['audio', 'video']:
            self.cloudinary_store.delete_file(file_id_or_public_id)
        else:
            print("Unsupported media type")

    def update_media_metadata(self, file_id, new_metadata, resource_type):
        if resource_type == 'image':
            return self.google_store.update_metadata(file_id, new_metadata)
        elif resource_type in ['audio', 'video']:
            print("Updating metadata not supported for Cloudinary")
        else:
            print("Unsupported media type")
