import datetime
from mongoengine import Document, DecimalField, StringField, DateTimeField, IntField, EmbeddedDocumentListField, ReferenceField
from app import db
from app.models.resource import Resource
from app.models.feedback import Feedback

class Lesson(Document):
    title = StringField(required=True)
    content = StringField(required=True)
    author_id = StringField(required=True)  # Reference to User ID
    duration = IntField()
    format = StringField(choices=['online', 'in-person'])
    location = StringField()
    price = DecimalField(min_value=0, precision=2)
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    lesson_id = StringField()
    description = StringField()
    status = StringField()  # e.g., planned, ongoing, completed
    instructor_id = StringField()  # Reference to User ID if using DBRefs or just a string
    scheduled_time = DateTimeField()
    resources = EmbeddedDocumentListField(Resource)
    feedback = EmbeddedDocumentListField(Feedback)
    level = StringField()  # e.g., Beginner, Intermediate, Advanced

    meta = {
        'collection': 'lessons',
        'indexes': [
            'lesson_id',  # Indexing for faster lookup by lesson_id
            'author_id',
            'scheduled_time'
        ]
    }

# db.register(Lesson)
