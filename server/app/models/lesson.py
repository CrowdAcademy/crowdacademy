import datetime
from app import db
from app.models.user import User

class Lesson(db.Document):
    title = db.StringField(required=True)
    content = db.StringField(required=True)
    author = db.ReferenceField(User, required=True)
    duration = db.IntField()
    format = db.StringField(choices=['online', 'in-person'])
    location = db.StringField()
    price = db.DecimalField(min_value=0, precision=2)
    created_at = db.DateTimeField(default=datetime.datetime.utcnow)

    # Add more fields as needed

    meta = {
        'collection': 'lessons'
    }
