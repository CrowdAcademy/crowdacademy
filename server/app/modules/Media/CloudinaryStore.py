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
            result = cloudinary.uploader.upload(file_path, resource_type="video")
            return result['secure_url'], result['public_id']
        except cloudinary.exceptions.Error as e:
            error_message = f"Upload failed with error: {str(e)}"
            if 'Invalid image file' in str(e):
                error_message = "Invalid image file. Please upload a valid image."
            print(error_message)
            return None, None

    def delete_file(self, public_id):

        try:

            result = cloudinary.uploader.destroy(public_id, resource_type="video")
            if result.get('result') == 'ok':
                return True
            
            else:
                logging.error("Deletion failed.")
                return False
            
        except Exception as e:
            logging.error(f"Exception during deletion: {e}")

            return False
