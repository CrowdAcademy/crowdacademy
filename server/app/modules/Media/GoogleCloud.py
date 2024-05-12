import os
import mimetypes
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError



class GoogleStore:
    def __init__(self):
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
