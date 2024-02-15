from app import db
from mongoengine import Document, StringField, EmailField, ObjectIdField

class User(Document):
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)

    meta = {
        'collection': 'users'
    }
    
    def check_password(self, password):
        # dummy password verification
        return True
