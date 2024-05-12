import mimetypes
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from dotenv import load_dotenv
import os
import cloudinary
import cloudinary.uploader

class GoogleStore:
    def __init__(self):
        load_dotenv()
        self.scopes = [os.getenv('SCOPES')]
        self.service_account_file = os.getenv('SERVICE_ACCOUNT_FILE')
        self.parent_folder_id = os.getenv('PARENT_FOLDER_ID')

    def authenticate(self):
        creds = service_account.Credentials.from_service_account_file(
            self.service_account_file, scopes=self.scopes)
        return creds

    def upload_file(self, file_path, filename):
        creds = self.authenticate()
        service = build('drive', 'v3', credentials=creds)
        metadata = {'name': filename, 'parents': [self.parent_folder_id], 'mimeType': mimetypes.guess_type(filename)[0]}
        try:
            file = service.files().create(
                body=metadata,
                media_body=file_path
            ).execute()
            return file['id']
        except HttpError as error:
            print(f"Upload failed with error: {error}")
            return None

    def delete_file(self, file_id_):
        creds = self.authenticate()
        service = build('drive', 'v3', credentials=creds)
        try:
            service.files().delete(fileId=file_id_).execute()
            print("File deleted successfully.")
        except HttpError as error:
            print(f"Deletion failed with error: {error}")

    def update_metadata(self, file_id_, new_metadata):
        creds = self.authenticate()
        service = build('drive', 'v3', credentials=creds)
        try:
            updated_file_ = service.files().update(fileId=file_id_, body=new_metadata).execute()
            print("Metadata updated successfully.")
            return updated_file_
        except HttpError as error:
            print(f"Metadata update failed with error: {error}")
            return None

class CloudinaryStore:
    def __init__(self):
        load_dotenv()
        cloudinary.config(
            cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
            api_key=os.getenv('CLOUDINARY_API_KEY'),
            api_secret=os.getenv('CLOUDINARY_API_SECRET')
        )

    def upload_file(self, file_path, resource_type):
        try:
            result = cloudinary.uploader.upload(file_path, resource_type=resource_type)
            return result['secure_url']
        except Exception as e:
            print(f"Upload failed with error: {e}")
            return None

    def delete_file(self, public_id):
        try:
            result = cloudinary.uploader.destroy(public_id)
            if result['result'] == 'ok':
                print("File deleted successfully.")
            else:
                print("Deletion failed.")
        except Exception as e:
            print(f"Deletion failed with error: {e}")

class MediaManager:
    def __init__(self):
        self.google_store = GoogleStore()
        self.cloudinary_store = CloudinaryStore()

    def upload_media(self, file_path, filename, resource_type):
        if resource_type in ['image', 'jpeg', 'png', 'gif']:
            return self.google_store.upload_file(file_path, filename)
        elif resource_type in ['audio', 'video']:
            return self.cloudinary_store.upload_file(file_path, resource_type)
        else:
            print("Unsupported media type")
            return None

    def delete_media(self, file_id_or_public_id, resource_type):
        if resource_type in ['image', 'jpeg', 'png', 'gif']:
            self.google_store.delete_file(file_id_or_public_id)
        elif resource_type in ['audio', 'video']:
            self.cloudinary_store.delete_file(file_id_or_public_id)
        else:
            print("Unsupported media type")

    def update_media_metadata(self, file_id, new_metadata, resource_type):
        if resource_type in ['image', 'jpeg', 'png', 'gif']:
            return self.google_store.update_metadata(file_id, new_metadata)
        elif resource_type in ['audio', 'video']:
            print("Updating metadata not supported for Cloudinary")
        else:
            print("Unsupported media type")

