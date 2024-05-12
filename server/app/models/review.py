import datetime
import pytz
from mongoengine import EmbeddedDocument, StringField, IntField, DateTimeField

class Review(EmbeddedDocument):
    user_id = StringField()
    value = IntField()  # make this out of ten
    comment = StringField()
    created_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
    updated_at = DateTimeField(default=datetime.datetime.now(pytz.utc))