import re

# Simple email validation function (replace with more robust validation if needed)
def is_valid_email(email):
    # Regular expression for basic email validation
    email_regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    return bool(re.match(email_regex, email))