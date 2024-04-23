class UserPermissions:
    """
    Permissions related to User model.
    """
    VIEW_USER = 'view_user'  # Permission to view user details.
    EDIT_USER = 'edit_user'  # Permission to edit user details.
    DELETE_USER = 'delete_user'  # Permission to delete user.
    CREATE_USER = 'create_user'  # Permission to create new user.

class ProfilePermissions:
    """
    Permissions related to Profile model.
    """
    VIEW_PROFILE = 'view_profile'   # Permission to view profile details.
    EDIT_PROFILE = 'edit_profile'   # Permission to edit profile details.
    DELETE_PROFILE = 'delete_profile'  # Permission to delete profile.
    CREATE_PROFILE = 'create_profile'  # Permission to create new profile.

class LessonPermissions:
    """
    Permissions related to Lesson model.
    """
    VIEW_LESSON = 'view_lesson'  # Permission to view lesson details.
    EDIT_LESSON = 'edit_lesson'  # Permission to edit lesson details.
    DELETE_LESSON = 'delete_lesson'  # Permission to delete lesson.
    CREATE_LESSON = 'create_lesson'  # Permission to create new lesson.


class ChallengePermissions:
    """
    Permissions related to Challenge model.
    """
    VIEW_CHALLENGE = 'view_challenge'  # Permission to view challenge details.
    EDIT_CHALLENGE = 'edit_challenge'  # Permission to edit challenge details.
    DELETE_CHALLENGE = 'delete_challenge'  # Permission to delete challenge.
    CREATE_CHALLENGE = 'create_challenge'  # Permission to create new challenge.

class PaymentPermissions:
    """
    Permissions related to Payment model.
    """
    VIEW_PAYMENT = 'view_payment'  # Permission to view payment details.
    EDIT_PAYMENT = 'edit_payment'  # Permission to edit payment details.
    DELETE_PAYMENT = 'delete_payment'  # Permission to delete payment.
    CREATE_PAYMENT = 'create_payment'  # Permission to create new payment.


class PaymentMethodPermissions:
    """
    Permissions related to PaymentMethod model.
    """
    VIEW_PAYMENT_METHOD = 'view_payment_method'  # Permission to view payment method details.
    EDIT_PAYMENT_METHOD = 'edit_payment_method'  # Permission to edit payment method details.
    DELETE_PAYMENT_METHOD = 'delete_payment_method'  # Permission to delete payment method.
    CREATE_PAYMENT_METHOD = 'create_payment_method'  # Permission to create new payment method.


class ResourcePermissions:
    """
    Permissions related to Resource model.
    """
    VIEW_RESOURCE = 'view_resource'  # Permission to view resource details.
    EDIT_RESOURCE = 'edit_resource'  # Permission to edit resource details.
    DELETE_RESOURCE = 'delete_resource'  # Permission to delete resource.
    CREATE_RESOURCE = 'create_resource'  # Permission to create new resource.


class FeedbackPermissions:
    """
    Permissions related to Feedback model.
    """
    VIEW_FEEDBACK = 'view_feedback'  # Permission to view feedback details.
    EDIT_FEEDBACK = 'edit_feedback'  # Permission to edit feedback details.
    DELETE_FEEDBACK = 'delete_feedback'  # Permission to delete feedback.
    CREATE_FEEDBACK = 'create_feedback'  # Permission to create new feedback.

class Permissions(
    UserPermissions,
    ProfilePermissions,
    LessonPermissions,
    ChallengePermissions,
    PaymentPermissions,
    PaymentMethodPermissions,
    ResourcePermissions,
    FeedbackPermissions
):
    pass
