from mongoengine import EmbeddedDocument, StringField, IntField

class Feedback(EmbeddedDocument):
    student_id = StringField()
    rating = IntField(min_value=1, max_value=5)  # Assuming a rating from 1 to 5
    comment = StringField()
