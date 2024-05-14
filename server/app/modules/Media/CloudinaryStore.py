import os
import cloudinary
from cloudinary.uploader import upload, destroy
from cloudinary.utils import cloudinary_url
from dotenv import load_dotenv
import logging

class CloudinaryStore:
    def __init__(self):
        load_dotenv()
        cloudinary.config(
            cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
            api_key=os.getenv('CLOUDINARY_API_KEY'),
            api_secret=os.getenv('CLOUDINARY_API_SECRET')
        )

    def upload_file(self, file_path):
        try:
            result = cloudinary.uploader.upload(file_path)
            return result['secure_url'], result['public_id']
        except Exception as e:
            print(f"Upload failed with error: {e}")
            return None, None

    def delete_file(self, public_id):
        try:
            result = cloudinary.uploader.destroy(public_id)
            if result['result'] == 'ok':
                print("File deleted successfully.")
            else:
                print("Deletion failed.")
        except Exception as e:
            print(f"Deletion failed with error: {e}")
