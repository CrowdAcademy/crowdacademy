import re
from mongoengine import StringField, EmailField, ListField, EmbeddedDocumentField, DateTimeField, ReferenceField
from app import db
from app.models.profile import Profile
from app.models.lesson import Lesson
from app.models.challenge import Challenge
from app.models.payment_method import PaymentMethod
from app.models.payment import Payment
from app.models.token import Token

class User(db.Document):
    """
    Document model representing a user.

    Attributes:
        username (str): Username of the user (required, unique).
        email (str): Email of the user (required, unique).
        password (str): Password of the user (required).
        roles (list): List of roles assigned to the user (required).
        permissions (list): List of permissions granted to the user.
        profile (Profile): Profile information of the user.
        lessons_created (list): List of lessons created by the user.
        lessons_enrolled (list): List of lessons enrolled by the user.
        challenges_created (list): List of challenges created by the user.
        challenges_solved (list): List of challenges solved by the user.
        payment_methods (list): List of payment methods associated with the user.
        payments (list): List of payments made by the user.
        created_at (datetime): Timestamp when the user was created.
        updated_at (datetime): Timestamp when the user was last updated.
        token (Token): Authentication token associated with the user.

    Meta:
        collection (str): Collection name in the database.
    """
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    roles = ListField(StringField(choices=("super_admin", "admin", "instructor", "student")), required=True)
    permissions = ListField(StringField())
    profile = EmbeddedDocumentField(Profile)
    lessons_created = ListField(ReferenceField(Lesson))
    lessons_enrolled = ListField(ReferenceField(Lesson))
    challenges_created = ListField(ReferenceField(Challenge))
    challenges_solved = ListField(ReferenceField(Challenge))
    payment_methods = ListField(EmbeddedDocumentField(PaymentMethod))
    payments = ListField(EmbeddedDocumentField(Payment))
    created_at = DateTimeField()
    updated_at = DateTimeField()
    token = EmbeddedDocumentField(Token, default=Token)

    meta = {
        'collection': 'users'
    }

    def clean(self):
        """Clean and validate user data before saving."""
        # Ensure username is lowercase and up to 30 characters
        self.username = self.username.lower()

        # Throw error if username exceeds 30 characters
        if len(self.username) > 30:
            raise ValueError("Username must be up to 30 characters.")

        # Validate username format
        if not re.match(r'^[a-zA-Z0-9._]+$', self.username):
            raise ValueError("Username can only contain numbers, letters, periods, and underscores.")

    def save(self, *args, **kwargs):
        """Override save method to clean and validate data before saving."""
        self.clean()
        return super().save(*args, **kwargs)

    def check_password(self, provided_password: str) -> bool:
        """
        Check if the provided password matches the user's password.

        Args:
            provided_password (str): Password provided for authentication.

        Returns:
            bool: True if the provided password matches the user's password, False otherwise.
        """
        return provided_password == self.password
