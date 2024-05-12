import datetime
import pytz
from mongoengine import EmbeddedDocument, StringField, DictField, DateTimeField

class PaymentMethod(EmbeddedDocument):
    type = StringField()
    details = DictField()
    created_at = DateTimeField(default=datetime.datetime.now(pytz.utc))  # New created_at field
