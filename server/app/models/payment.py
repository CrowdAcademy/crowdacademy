from mongoengine import EmbeddedDocument, StringField, FloatField, DateTimeField

class Payment(EmbeddedDocument):
    payment_id = StringField()
    amount = FloatField()
    currency = StringField()
    method = StringField()
    date = DateTimeField()
    status = StringField()
