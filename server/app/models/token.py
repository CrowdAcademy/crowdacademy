from mongoengine import StringField, EmbeddedDocument

class Token(EmbeddedDocument):
    current_token = StringField()
