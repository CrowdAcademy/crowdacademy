import datetime
import pytz
from mongoengine import EmbeddedDocument, StringField, IntField, DateTimeField

class Review(EmbeddedDocument):
    """Embedded document model representing a review."""

    user_id = StringField()
    value = IntField(min_value=1, max_value=10, help_text="Rating value out of ten")
    comment = StringField()
    
    created_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the review was created")
    updated_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the review was last updated")

    def save(self, *args, **kwargs):
        """Override save method to update the updated_at field."""
        self.updated_at = datetime.datetime.now(pytz.utc)

        return super(Review, self).save(*args, **kwargs)
