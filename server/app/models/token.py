from mongoengine import StringField, EmbeddedDocument

class Token(EmbeddedDocument):
    """Embedded document model representing a user token."""

    current_token = StringField(help_text="Current token of the user")
