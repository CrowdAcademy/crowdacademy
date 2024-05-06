from datetime import datetime, timezone
from mongoengine import Document, DecimalField, StringField, DateTimeField, IntField, EmbeddedDocumentListField, BooleanField
from app.models.resource import Resource
from app.models.feedback import Feedback
from app.models.rating import Rating

class Lesson(Document):
    lesson_id = StringField()
    title = StringField(required=True)
    content = StringField(required=True)
    author_id = StringField(required=True)  # Reference to User ID
    duration = IntField()
    format = StringField(choices=['online', 'in-person'])
    location = StringField()
    price = DecimalField(min_value=0, precision=2)
    premium = BooleanField()
    created_at = DateTimeField(default=datetime.now(timezone.utc))
    description = StringField()
    status = StringField(default="active")  # e.g., active, completed, archived
    instructor_id = StringField()  # Reference to User ID if using DBRefs or just a string
    scheduled_time = DateTimeField()
    resources = EmbeddedDocumentListField(Resource)
    feedback = EmbeddedDocumentListField(Feedback) 
    rating = EmbeddedDocumentListField(Rating)
    average_rating = EmbeddedDocumentListField(Rating)
    level = StringField()  # e.g., Beginner, Intermediate, Advanced

    meta = {
        'collection': 'lessons',
        'indexes': [
            'lesson_id',  # Indexing for faster lookup by lesson_id
            'author_id',
            'scheduled_time'
        ]
    }