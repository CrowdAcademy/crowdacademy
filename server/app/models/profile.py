import datetime
import pytz
from mongoengine import EmbeddedDocument, StringField, DateTimeField

class Profile(EmbeddedDocument):
    avatar = StringField()
    bio = StringField()
    full_name = StringField()
    location = StringField()
    contact_number = StringField()
    updated_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
