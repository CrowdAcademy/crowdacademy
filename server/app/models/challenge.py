import datetime
from app import db

class Challenge(db.Document):
    title = db.StringField(required=True)
    description = db.StringField(required=True)
    tags = db.ListField(db.StringField())
    creator = db.ReferenceField('User')
    created_at = db.DateTimeField(default=datetime.datetime.utcnow)
    updated_at = db.DateTimeField(default=datetime.datetime.utcnow)

    # Add more fields as needed

    meta = {
        'collection': 'challenges'
    }
