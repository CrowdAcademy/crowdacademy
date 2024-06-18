import datetime
import pytz
from mongoengine import (
    Document, DecimalField, StringField, DateTimeField, IntField,
    EmbeddedDocumentListField, ReferenceField, ListField, EnumField,
    BooleanField
)
from enum import Enum
from app.models.resource import Resource
from app.models.feedback import Feedback
from app.models.block import Block

class ProficiencyLevel(Enum):
    """Enumeration for lesson proficiency levels."""
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    ANY = "any"

class LessonStatus(Enum):
    """Enumeration for lesson statuses."""
    ACTIVE = "active"
    EDITING = "editing"
    HIDDEN = "hidden"
    ARCHIVED = "archived"

class LessonDeliveryFormat(Enum):
    """Enumeration for lesson delivery formats."""
    ON_DEMAND = "on_demand"
    IN_PERSON = "in_person"
    LIVE = "live"

class Lesson(Document):
    """A MongoDB document model representing a lesson."""

    title = StringField(required=True, max_length=200, help_text="Title of the lesson")
    description = StringField(required=True, help_text="Description of the lesson")
    instructor_id = StringField(required=True, help_text="ID of the instructor")
    instructor_username = StringField(required=True, max_length=100, help_text="Username of the instructor")
    
    instructor_avatar = StringField(max_length=200, help_text="URL to the instructor's avatar")
    blocks = EmbeddedDocumentListField(Block, help_text="Content blocks of the challenge")
    feedback = EmbeddedDocumentListField(Feedback, help_text="Feedback for the lesson")
    resource_ids = ListField(ReferenceField(Resource), help_text="References to lesson resources")
    duration = IntField(min_value=1, help_text="Duration of the lesson in minutes")
    location = StringField(max_length=200, help_text="Location where the lesson takes place")
    scheduled_time = DateTimeField(help_text="Scheduled time for the lesson")
    price = DecimalField(min_value=0, precision=2, help_text="Price of the lesson")
    tags = ListField(StringField(max_length=50), help_text="Tags associated with the lesson")


    free = BooleanField(default=True, help_text="Indicates if the lesson is free")
    published = BooleanField(default=False, help_text="Indicates if the lesson is published")
    format = EnumField(LessonDeliveryFormat, default=LessonDeliveryFormat.ON_DEMAND, help_text="Delivery format of the lesson")
    status = EnumField(LessonStatus, default=LessonStatus.EDITING, help_text="Status of the lesson")
    level = EnumField(ProficiencyLevel, default=ProficiencyLevel.ANY, help_text="Proficiency level required for the lesson")
    created_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the lesson was created")
    updated_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the lesson was last updated")

    meta = {
        'collection': 'lessons',
        'indexes': [
            'instructor_id',
            'scheduled_time',
            'title',
        ],
        'ordering': ['-created_at'],
    }

    def save(self, *args, **kwargs):
        """Override save method to update the updated_at field."""
        self.updated_at = datetime.datetime.now(pytz.utc)

        return super(Lesson, self).save(*args, **kwargs)
