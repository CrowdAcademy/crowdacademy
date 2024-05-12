from mongoengine import EmbeddedDocument, BooleanField, StringField, ListField, IntField


class Block(EmbeddedDocument):
    type = StringField(required=True)
    content = StringField()
    url = StringField()
    resource = BooleanField()
    resource_id = StringField()
    users = ListField(StringField())
    position = IntField()
    