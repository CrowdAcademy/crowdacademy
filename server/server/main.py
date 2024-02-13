import os
from dotenv import load_dotenv
from Media import MediaManager

# Load environment variables from .env file
load_dotenv()


def main():
    manager = MediaManager()

    try:
        # Upload compressed video
        compressed_video_public_id = manager.upload_compressed_video("uploads/video.mp4")

        # Download video (replace "downloaded_video.mp4" with desired path)
        downloaded_video_path = "downloaded_video.mp4"
        manager.download_media(compressed_video_public_id, downloaded_video_path)

        print(f"Downloaded video to: {downloaded_video_path}")

        # Delete uploaded files (optional)
        # Comment out if you want to keep them
        # manager.delete_file(compressed_video_public_id)

    except Exception as e:
        print(f"An error occurred: {str(e)}")


if __name__ == "__main__":
    main()
