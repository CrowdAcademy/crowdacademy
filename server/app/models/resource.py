import pytz
import datetime
from mongoengine import Document, StringField, DateTimeField, ObjectIdField, ListField
from enum import Enum
from mongoengine.fields import EnumField

class ResourceType(Enum):
    IMAGE = "image"
    AUDIO = "audio"
    VIDEO = "video"

class Resource(Document):
    resource_type = EnumField(ResourceType, required=True)  # Use EnumField for resource_type
    link = StringField()
    access_id = StringField()
    description = StringField()
    created_at = DateTimeField(default=datetime.datetime.now(pytz.utc))
    user_ids = ListField(ObjectIdField())
