import pytz
import datetime
from mongoengine import Document, StringField, DateTimeField, ObjectIdField, ListField

class Resource(Document):
    resource_type = StringField()  # e.g., video, book, article
    link = StringField()
    access_id = StringField()
    description = StringField()
    created_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
    user_ids = ListField(ObjectIdField())
