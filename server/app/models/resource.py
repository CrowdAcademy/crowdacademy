import datetime
import pytz
from mongoengine import Document, StringField, DateTimeField, ObjectIdField, ListField
from enum import Enum
from mongoengine.fields import EnumField

class ResourceType(Enum):
    """Enumeration for resource types."""
    IMAGE = "image"
    AUDIO = "audio"
    VIDEO = "video"

class Resource(Document):
    """Document model representing a resource."""

    # Required fields
    resource_type = EnumField(ResourceType, required=True, help_text="Type of resource (image, audio, video)")

    # Optional fields
    link = StringField(max_length=500, help_text="URL link to the resource")
    access_id = StringField(max_length=100, help_text="Access ID for the resource")
    description = StringField(max_length=1000, help_text="Description of the resource")
    user_ids = ListField(ObjectIdField(), help_text="List of user IDs associated with the resource")

    # Fields with default values
    created_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the resource was created")

    meta = {
        'indexes': [
            'resource_type',  # Indexing for faster lookup by resource_type
            'access_id'       # Indexing for efficient querying by access_id
        ]
    }

    def save(self, *args, **kwargs):
        """Override save method to update the updated_at field."""
        self.updated_at = datetime.datetime.now(pytz.utc)
        
        return super(Resource, self).save(*args, **kwargs)

