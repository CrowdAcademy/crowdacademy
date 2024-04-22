from mongoengine import EmbeddedDocument, StringField

class Profile(EmbeddedDocument):
    avatar = StringField()
    bio = StringField()
    full_name = StringField()
    location = StringField()
    contact_number = StringField()
