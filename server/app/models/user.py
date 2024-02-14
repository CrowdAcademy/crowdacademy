from app import db

class User(db.Document):
    username = db.StringField(required=True, unique=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)

    meta = {
        'collection': 'users'
    }


# class User(db.Document):
#     username = db.StringField(required=True, unique=True)
#     email = db.EmailField(required=True, unique=True)
#     password = db.StringField(required=True)
#     full_name = db.StringField(required=True)
#     bio = db.StringField()
#     avatar_url = db.URLField()
#     created_at = db.DateTimeField(default=datetime.datetime.utcnow)

#     # Add more fields as needed

#     meta = {
#         'collection': 'users'
#     }
