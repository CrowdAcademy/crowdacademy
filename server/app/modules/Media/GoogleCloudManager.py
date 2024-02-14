from googleapiclient.discovery import build
from google.oauth2 import service_account
import mimetypes  # Optional: For MIME type handling
from googleapiclient.errors import HttpError

# Replace with your actual values
SCOPES = ['https://www.googleapis.com/auth/drive']
SERVICE_ACCOUNT_FILE = 'service_account_file.json'
PARENT_FOLDER_ID = "1U4gvxcUjZ3OTN227qCOPKUyvTDwcUDrw"


# Authentication function
def authenticate():
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return creds


# Upload any file type
def upload_file(file_path, filename):
    creds = authenticate()
    service = build('drive', 'v3', credentials=creds)
    metadata = {'name': filename, 'parents': [PARENT_FOLDER_ID], 'mimeType': mimetypes.guess_type(filename)[0]}
    # Upload the file and capture the response
    try:
        file = service.files().create(
            body=metadata,
            media_body=file_path
        ).execute()
        # Extract the file ID from the response
        file_id = file['id']
        # Return the file ID
        return file_id
    except HttpError as error:
        # Handle upload errors as needed
        print(f"Upload failed with error: {error}")
        return None


# Upload video file
def upload_video(video_path, filename):
    return upload_file(video_path, filename)


# Delete by ID
def delete_file(file_id_):
    creds = authenticate()
    service = build('drive', 'v3', credentials=creds)
    # Delete the file
    try:
        service.files().delete(fileId=file_id_).execute()
        print("File deleted successfully.")
    except HttpError as error:
        # Handle deletion errors as needed
        print(f"Deletion failed with error: {error}")


# Update metadata
def update_metadata(file_id_, new_metadata):
    creds = authenticate()
    service = build('drive', 'v3', credentials=creds)
    # Update the file metadata
    try:
        updated_file_ = service.files().update(fileId=file_id_, body=new_metadata).execute()
        print("Metadata updated successfully.")
        return updated_file_
    except HttpError as error:
        # Handle metadata update errors as needed
        print(f"Metadata update failed with error: {error}")


# Media Store ADT (optional, implement as needed)
class Media:
    def __init__(self, file_id_, name, mimetype, metadata):
        self.file_id = file_id_
        self.name = name
        self.mimetype = mimetype
        self.metadata = metadata


class MediaStore:
    def __init__(self):
        self.media_items = {}

    def add(self, media):
        self.media_items[media.file_id] = media

    def get(self, file_id_):
        return self.media_items.get(file_id_)

    def delete(self, file_id_):
        if file_id in self.media_items:
            del self.media_items[file_id_]

    def list(self):
        return list(self.media_items.values())


# Example usage
# Replace with actual paths, content, and metadata
video_filename = "video.mp4"
video_file_path = "uploads/" + video_filename

file_id = upload_video(video_file_path, video_filename)
if file_id:
    print(f"Uploaded video ID: {file_id}")

    delete_vid = input("Delete video? ")
    if delete_vid == "yes":
        delete_file("file_id")

updated_file = update_metadata("file_id", {"description": "new description"})
if updated_file:
    print(f"Updated file metadata: {updated_file}")
