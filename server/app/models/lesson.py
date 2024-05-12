import pytz
import datetime
from enum import Enum
from app.models.block import Block
from app.models.review import Review
from mongoengine.fields import EnumField
from app.models.resource import Resource
from app.models.feedback import Feedback
from mongoengine import Document, DecimalField, StringField, DateTimeField, IntField, EmbeddedDocumentListField, BooleanField, FloatField, ListField, ReferenceField

class StatusField(Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class LevelField(Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"

class Lesson(Document):
    lesson_id = StringField(required=True)
    title = StringField(required=True)
    content = StringField(required=True)
    author_id = StringField(required=True)  # Reference to User ID
    duration = IntField()
    format = StringField(choices=['online', 'in-person'])
    location = StringField()
    price = DecimalField(min_value=0, precision=2)
    premium = BooleanField()
    created_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
    updated_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
    description = StringField()
    status = EnumField(StatusField, default=StatusField.ACTIVE.value)  # EnumField for status
    instructor_id = StringField()  # Reference to User ID if using DBRefs or just a string
    scheduled_time = DateTimeField()
    resource_ids = ListField(ReferenceField(Resource))
    feedback = EmbeddedDocumentListField(Feedback) 
    reviews = EmbeddedDocumentListField(Review)
    average_rating = FloatField()
    level = EnumField(LevelField)  # EnumField for level
    blocks = EmbeddedDocumentListField(Block)

    meta = {
        'collection': 'lessons',
        'indexes': [
            'lesson_id',  # Indexing for faster lookup by lesson_id
            'author_id',
            'scheduled_time'
        ]
    }
