from mongoengine import EmbeddedDocument, IntField, StringField

class Rating(EmbeddedDocument):
    """Embedded document model representing a rating."""

    value = IntField(required=True, min_value=1, max_value=5, help_text="Rating value from 1 to 5")
    user_id = StringField(required=True, help_text="ID of the user providing the rating")
