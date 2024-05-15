import os
import mimetypes
from google.oauth2 import service_account
from googleapiclient.discovery import build, MediaFileUpload
from googleapiclient.errors import HttpError
import logging
from dotenv import load_dotenv



# Load environment variables from the .env file
load_dotenv()

class GoogleStore:
    def __init__(self):
        self.scopes = os.getenv('SCOPES').split(',')
        self.service_account_file = os.getenv('SERVICE_ACCOUNT_FILE')
        self.parent_folder_id = os.getenv('PARENT_FOLDER_ID')

        # Logging setup
        logging.basicConfig(level=logging.DEBUG)
        self.logger = logging.getLogger(__name__)

        self.logger.debug(f"Service Account File: {self.service_account_file}")
        self.logger.debug(f"Scopes: {self.scopes}")
        self.logger.debug(f"Parent Folder ID: {self.parent_folder_id}")

        if not self.service_account_file or not os.path.exists(self.service_account_file):
            raise FileNotFoundError(f"Service account file not found: {self.service_account_file}")

    def authenticate(self):

        try:

            creds = service_account.Credentials.from_service_account_file(
                self.service_account_file, scopes=self.scopes)
            
            return creds
        
        except Exception as e:
            self.logger.error(f"Failed to authenticate using the service account file: {e}")

            return None

    def upload_file(self, file_path, filename):

        try:
            creds = self.authenticate()

            if creds is None:
                raise RuntimeError("Authentication failed due to missing service account file.")
            
            service = build('drive', 'v3', credentials=creds)

            metadata = {
                'name': filename,
                'parents': [self.parent_folder_id],
                'mimeType': mimetypes.guess_type(file_path)[0]
            }

            self.logger.debug(f"Metadata: {metadata}")

            media_body = MediaFileUpload(file_path, mimetype=mimetypes.guess_type(file_path)[0])
            file = service.files().create(body=metadata, media_body=media_body, fields='id,webViewLink').execute()

            url = file.get('webViewLink')
            access_id = file.get('id')

            return url, access_id

        except FileNotFoundError as error:
            self.logger.error(f"File not found error: {error}")

        except HttpError as error:
            self.logger.error(f"Upload failed with HTTP error: {error}")

        except Exception as error:
            self.logger.error(f"An unexpected error occurred: {error}")

        finally:

            try:
                os.remove(file_path)
                self.logger.debug(f"File {file_path} removed successfully.")

            except Exception as e:
                self.logger.error(f"File removal failed: {e}")

        return None, None

    def update_metadata(self, file_id, new_metadata):

        try:
            creds = self.authenticate()

            if creds is None:
                raise RuntimeError("Authentication failed due to missing service account file.")
            
            service = build('drive', 'v3', credentials=creds)

            file = service.files().update(fileId=file_id, body=new_metadata, fields='id').execute()
            self.logger.debug(f"Metadata updated successfully for file ID: {file_id}")

            return file
        
        except HttpError as error:
            self.logger.error(f"Metadata update failed with HTTP error: {error}")

            return None
        
        except Exception as error:
            self.logger.error(f"An unexpected error occurred: {error}")

            return None

    def delete_file(self, file_id):

        try:
            creds = self.authenticate()

            if creds is None:
                raise RuntimeError("Authentication failed due to missing service account file.")
            
            service = build('drive', 'v3', credentials=creds)

            service.files().delete(fileId=file_id).execute()
            self.logger.debug(f"File deleted successfully: {file_id}")

            return True
        
        except HttpError as error:
            self.logger.error(f"File deletion failed with HTTP error: {error}")

        except Exception as error:
            self.logger.error(f"An unexpected error occurred: {error}")

        return False