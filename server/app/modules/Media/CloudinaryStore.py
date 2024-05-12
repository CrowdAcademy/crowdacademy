import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

class CloudinaryStore:
    def __init__(self, cloud_name, api_key, api_secret):
        self.cloud_name = cloud_name
        self.api_key = api_key
        self.api_secret = api_secret
        # Configure Cloudinary
        cloudinary.config(
            cloud_name=cloud_name,
            api_key=api_key,
            api_secret=api_secret
        )

    def upload_file(self, file_path):
        try:
            # Upload file to Cloudinary
            uploaded_file = upload(file_path)
            # Get URL and public ID of the uploaded file
            url, public_id = cloudinary_url(uploaded_file['public_id'], format=uploaded_file['format'])
            return url, public_id
        except Exception as e:
            print(f"Upload failed with error: {e}")
            return None, None

    def delete_file(self, public_id):
        try:
            # Delete file from Cloudinary
            cloudinary.uploader.destroy(public_id)
            print("File deleted successfully.")
        except Exception as e:
            print(f"Deletion failed with error: {e}")
