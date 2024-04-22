from mongoengine import EmbeddedDocument, StringField

class Resource(EmbeddedDocument):
    resource_type = StringField()  # e.g., video, book, article
    link = StringField()
    description = StringField()
