from mongoengine import EmbeddedDocument, BooleanField, StringField, ListField, IntField, EnumField
from enum import Enum

class BlockType(Enum):
    """Enumeration for types of content blocks."""
    IMAGE = "image"
    AUDIO = "audio"
    VIDEO = "video"
    TEXT = "text"

class Block(EmbeddedDocument):
    """Embedded document model representing a content block in a lesson."""

    type = EnumField(BlockType, required=True, help_text="Type of content block")
    content = StringField(required=True, help_text="Content of the block")

    url = StringField(max_length=200, help_text="URL for the block resource")
    resource_id = StringField(help_text="ID of the associated resource")
    position = IntField(min_value=0, help_text="Position of the block in the sequence")
    
    resource = BooleanField(default=False, help_text="Indicates if the block is a resource")

    meta = {
        'indexes': [
            'resource_id',
            'position'
        ]
    }
