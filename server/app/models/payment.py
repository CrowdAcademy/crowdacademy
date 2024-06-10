import datetime
import pytz
from mongoengine import EmbeddedDocument, StringField, FloatField, DateTimeField, EnumField
from enum import Enum

class PaymentStatus(Enum):
    """Enumeration for payment statuses."""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

class Payment(EmbeddedDocument):
    """Embedded document model representing a payment."""

    payment_id = StringField(required=True, help_text="Unique identifier for the payment")
    amount = FloatField(required=True, min_value=0, help_text="Amount of the payment")
    currency = StringField(required=True, help_text="Currency of the payment")
    method = StringField(required=True, help_text="Payment method used")
    date = DateTimeField(required=True, help_text="Date of the payment")
    status = EnumField(PaymentStatus, required=True, help_text="Status of the payment")
    created_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the payment was created")

    meta = {
        'indexes': [
            'payment_id',  # Indexing for faster lookup by payment_id
            'status'       # Indexing for efficient querying by status
        ]
    }
