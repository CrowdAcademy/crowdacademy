import datetime
import pytz
from mongoengine import Document, StringField, ListField, DateTimeField, ReferenceField, EnumField, EmbeddedDocumentListField
from enum import Enum
from app.models.resource import Resource
from app.models.feedback import Feedback
from app.models.block import Block

class StatusField(Enum):
    """Enumeration for challenge statuses."""
    ACTIVE = "active"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class Challenge(Document):
    """A MongoDB document model representing a challenge."""

    title = StringField(required=True, max_length=200, help_text="Title of the challenge")
    description = StringField(required=True, help_text="Description of the challenge")
    author_id = StringField(required=True, help_text="ID of the author")
    author_username = StringField(required=True, max_length=100, help_text="Username of the author")

    author_avatar = StringField(max_length=200, help_text="URL to the author's avatar")
    resource_ids = ListField(ReferenceField(Resource), help_text="References to challenge resources")
    feedback = EmbeddedDocumentListField(Feedback, help_text="Feedback for the challenge")
    blocks = EmbeddedDocumentListField(Block, help_text="Content blocks of the challenge")
    tags = ListField(StringField(max_length=50), help_text="Tags associated with the challenge")

    status = EnumField(StatusField, default=StatusField.ACTIVE, help_text="Status of the challenge")
    created_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the challenge was created")
    updated_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the challenge was last updated")

    meta = {
        'collection': 'challenges',
        'indexes': [
            'author_id',  # Indexing for faster lookup by author_id
            'status',     # Indexing status for efficient querying by status
        ],
        'ordering': ['-created_at'],  # Default ordering by creation date
    }

    def save(self, *args, **kwargs):
        """Override save method to update the updated_at field."""
        self.updated_at = datetime.datetime.now(pytz.utc)
        
        return super(Challenge, self).save(*args, **kwargs)
