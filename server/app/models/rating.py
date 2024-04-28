from mongoengine import EmbeddedDocument, IntField, StringField

class Rating(EmbeddedDocument):
    value = IntField()
    user_id = StringField()
