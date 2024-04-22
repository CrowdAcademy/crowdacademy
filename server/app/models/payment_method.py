from mongoengine import EmbeddedDocument, StringField, DictField

class PaymentMethod(EmbeddedDocument):
    type = StringField()
    details = DictField()
