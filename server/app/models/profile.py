import datetime
import pytz
from mongoengine import EmbeddedDocument, StringField, DateTimeField

class Profile(EmbeddedDocument):
    """Embedded document model representing a user profile."""

    # Optional fields
    avatar = StringField(max_length=200, help_text="URL of the avatar image")
    bio = StringField(max_length=500, help_text="Biography of the user")
    full_name = StringField(max_length=100, help_text="Full name of the user")
    location = StringField(max_length=100, help_text="Location of the user")
    contact_number = StringField(max_length=20, help_text="Contact number of the user")

    # Fields with default values
    updated_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the profile was last updated")

    def save(self, *args, **kwargs):
        """Override save method to update the updated_at field."""
        self.updated_at = datetime.datetime.now(pytz.utc)
        
        return super(Profile, self).save(*args, **kwargs)
