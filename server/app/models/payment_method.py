import datetime
import pytz
from mongoengine import EmbeddedDocument, StringField, DictField, DateTimeField, EnumField
from enum import Enum

class PaymentType(Enum):
    """Enumeration for payment method types."""
    CREDIT_CARD = "credit_card"
    PAYPAL = "paypal"
    BANK_TRANSFER = "bank_transfer"
    APPLE_PAY = "apple_pay"
    GOOGLE_PAY = "google_pay"

class PaymentMethod(EmbeddedDocument):
    """Embedded document model representing a payment method."""

    type = EnumField(PaymentType, required=True, help_text="Type of payment method")
    details = DictField(required=True, help_text="Details of the payment method")

    created_at = DateTimeField(default=lambda: datetime.datetime.now(pytz.utc), help_text="Timestamp when the payment method was created")

    meta = {
        'indexes': [
            'type',  # Indexing for faster lookup by type
        ]
    }
