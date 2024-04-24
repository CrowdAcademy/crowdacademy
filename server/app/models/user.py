from mongoengine import StringField, EmailField, ListField, EmbeddedDocumentField, DateTimeField, ReferenceField
from app import db
from app.models.profile import Profile
from app.models.lesson import Lesson
from app.models.challenge import Challenge
from app.models.payment_method import PaymentMethod
from app.models.payment import Payment

class User(db.Document):
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    roles = ListField(StringField(choices=("super_admin", "admin", "instructor", "student")), required=True)
    permissions = ListField(StringField())
    profile = EmbeddedDocumentField(Profile)
    lessons_created = ListField(ReferenceField(Lesson))
    lessons_enrolled = ListField(ReferenceField(Lesson))
    challenges_created = ListField(ReferenceField('Challenge'))  # Correctly reference the Challenge class
    challenges_solved = ListField(ReferenceField('Challenge'))  # Correctly reference the Challenge class
    payment_methods = ListField(EmbeddedDocumentField(PaymentMethod))
    payments = ListField(EmbeddedDocumentField(Payment))
    created_at = DateTimeField()
    updated_at = DateTimeField()

    meta = {
        'collection': 'users'
    }

    def check_password(self, provided_password: str):
        return provided_password == self.password