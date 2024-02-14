import os
import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from cloudinary.uploader import destroy
import lzma


class MediaManager:
    def __init__(self):
        # Set Cloudinary configuration
        cloudinary.config(
            cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
            api_key=os.environ.get("CLOUDINARY_API_KEY"),
            api_secret=os.environ.get("CLOUDINARY_API_SECRET")
        )

    @staticmethod
    def upload_image(file_path: str) -> str:
        """Uploads an image file to Cloudinary.

        Args:
            file_path (str): Path to the image file to upload.

        Returns:
            str: The public ID of the uploaded image.
        """
        try:
            response = upload(file_path)
            return response['public_id']
        except Exception as e:
            raise Exception(f"Failed to upload image: {str(e)}")

    @staticmethod
    def upload_compressed_video(file_path: str) -> str:
        """Compresses and uploads a video file to Cloudinary.

        Args:
            file_path (str): Path to the video file to upload.

        Returns:
            str: The public ID of the uploaded video.
        """
        try:
            compressed_file_path = f"file_path"
            VideoUtil.compress_video(file_path, compressed_file_path)
            response = upload(compressed_file_path, resource_type="video")
            os.remove(compressed_file_path)  # Remove compressed file after upload
            return response['public_id']
        except Exception as e:
            raise Exception(f"Failed to upload video: {str(e)}")

    @staticmethod
    def download_media(public_id: str, output_file: str) -> None:
        """Downloads a media file from Cloudinary.

        Args:
            public_id (str): The public ID of the media file on Cloudinary.
            output_file (str): Path to save the downloaded media file.
        """
        try:
            url, options = cloudinary_url(public_id)
            # Download the media file using the generated URL
            # Code for downloading the file from the generated URL
        except Exception as e:
            raise Exception(f"Failed to download media: {str(e)}")

    @staticmethod
    def delete_file(public_id: str) -> None:
        """Deletes a file from Cloudinary.

        Args:
            public_id (str): The public ID of the file on Cloudinary.
        """
        try:
            response = destroy(public_id)
            print("File deleted successfully.")
        except Exception as e:
            raise Exception(f"Failed to delete file: {str(e)}")


class VideoUtil:
    @staticmethod
    def compress_video(input_file: str, output_file: str) -> None:
        """Compresses a video file using LZMA compression.

        Args:
            input_file (str): Path to the input video file.
            output_file (str): Path to save the compressed video file.
        """
        try:
            with open(input_file, 'rb') as f:
                data = f.read()
                with lzma.open(output_file, 'wb') as f_out:
                    f_out.write(data)
        except Exception as e:
            raise Exception(f"Failed to compress video: {str(e)}")

    @staticmethod
    def decompress_video(input_file: str, output_file: str) -> None:
        """Decompresses a video file compressed with LZMA compression.

        Args:
            input_file (str): Path to the input compressed video file.
            output_file (str): Path to save the decompressed video file.
        """
        try:
            with lzma.open(input_file, 'rb') as f:
                data = f.read()
                with open(output_file, 'wb') as f_out:
                    f_out.write(data)
        except Exception as e:
            raise Exception(f"Failed to decompress video: {str(e)}")
