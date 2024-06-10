import pytz
import datetime
from bson import ObjectId
from mongoengine import EmbeddedDocument, StringField, IntField, DateTimeField, ObjectIdField

class Feedback(EmbeddedDocument):
    """Embedded document model representing feedback for a lesson or challenge."""

    id = ObjectIdField(default=lambda: ObjectId(), primary_key=True, help_text="Unique identifier for the feedback")
    student_id = StringField(required=True, help_text="ID of the student providing the feedback")
    rating = IntField(min_value=1, max_value=10, required=True, help_text="Rating given by the student (1 to 10)")

    comment = StringField(max_length=500, help_text="Comment provided by the student")

    created_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the feedback was created")
    updated_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the feedback was last updated")

    def save(self, *args, **kwargs):
        """Override save method to update the updated_at field."""
        self.updated_at = datetime.datetime.now(pytz.utc)
        
        return super(Feedback, self).save(*args, **kwargs)
