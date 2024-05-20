import pytz
import datetime
from bson import ObjectId
from mongoengine import EmbeddedDocument, StringField, IntField, DateTimeField, ObjectIdField

class Feedback(EmbeddedDocument):
    id = ObjectIdField(default=ObjectId)
    student_id = StringField()
    rating = IntField(min_value=1, max_value=10)  # Assuming a rating from 1 to 5 (rating % 2 != 0 for the 1/2 ratings)
    comment = StringField()
    created_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
    updated_at = DateTimeField(default=datetime.datetime.now(pytz.utc))