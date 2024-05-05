from mongoengine import EmbeddedDocument, StringField, LineStringField

class Resource(EmbeddedDocument):
    resource_type = StringField()  # e.g., video, book, article, image, ...
    link = StringField()
    description = StringField()
    users = LineStringField()
