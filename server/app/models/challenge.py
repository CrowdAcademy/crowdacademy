import datetime
from mongoengine import EmbeddedDocument, StringField, ListField, DateTimeField, EmbeddedDocumentListField
from app import db
from app.models.resource import Resource
from app.models.feedback import Feedback

class Challenge(EmbeddedDocument):
    challenge_id = StringField()
    title = StringField(required=True)
    description = StringField(required=True)
    status = StringField(default="active")  # e.g., active, completed, archived
    author_id = StringField(required=True)  # Reference to User ID
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    resources = EmbeddedDocumentListField(Resource)
    feedback = EmbeddedDocumentListField(Feedback)
    tags = ListField(StringField())

    meta = {
        'indexes': [
            'challenge_id',  # Indexing for faster lookup by challenge_id
            'author_id'
        ]
    }

# db.register(Challenge)
