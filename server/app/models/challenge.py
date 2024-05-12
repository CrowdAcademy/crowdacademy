import datetime
import pytz
from mongoengine import Document, StringField, ListField, DateTimeField, ReferenceField, EnumField, EmbeddedDocumentListField
from mongoengine import EmbeddedDocument, StringField, ListField, DateTimeField, EmbeddedDocumentListField
from app import db
from app.models.resource import Resource
from app.models.feedback import Feedback
from enum import Enum

class StatusField(Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class Challenge(Document):
    title = StringField(required=True)
    description = StringField(required=True)
    status = EnumField(StatusField, default=StatusField.ACTIVE.value)  # EnumField for status
    author_id = StringField(required=True)
    created_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
    updated_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
    resource_ids = ListField(ReferenceField(Resource))
    feedback = EmbeddedDocumentListField(Feedback)
    tags = ListField(StringField())

    meta = {
        'indexes': [
            'author_id'  # Indexing for faster lookup by author_id
        ]
    }
