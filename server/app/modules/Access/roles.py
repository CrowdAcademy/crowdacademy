from app.modules.Access.permissions import *


class Roles:
    STUDENT = {
        LessonPermissions.VIEW_LESSON,
        ProfilePermissions.VIEW_PROFILE,
        FeedbackPermissions.VIEW_FEEDBACK
    }

    INSTRUCTOR = {
        *STUDENT,
        LessonPermissions.EDIT_LESSON,
        FeedbackPermissions.CREATE_FEEDBACK,
        ProfilePermissions.EDIT_PROFILE
    }

    MODERATOR = {
        *INSTRUCTOR,
        UserPermissions.VIEW_USER,
        FeedbackPermissions.EDIT_FEEDBACK,
        FeedbackPermissions.DELETE_FEEDBACK
    }

    PREMIUM_USER = {
        *STUDENT,
        ProfilePermissions.EDIT_PROFILE
    }

    ADMIN = {
        *MODERATOR,
        UserPermissions.EDIT_USER,
        UserPermissions.DELETE_USER,
        LessonPermissions.CREATE_LESSON,
        LessonPermissions.EDIT_LESSON,
        LessonPermissions.DELETE_LESSON,
        ChallengePermissions.CREATE_CHALLENGE,
        ChallengePermissions.EDIT_CHALLENGE,
        ChallengePermissions.DELETE_CHALLENGE,
        ResourcePermissions.CREATE_RESOURCE,
        ResourcePermissions.EDIT_RESOURCE,
        ResourcePermissions.DELETE_RESOURCE,
        PaymentPermissions.CREATE_PAYMENT,
        PaymentPermissions.EDIT_PAYMENT,
        PaymentPermissions.DELETE_PAYMENT,
        PaymentMethodPermissions.CREATE_PAYMENT_METHOD,
        PaymentMethodPermissions.EDIT_PAYMENT_METHOD,
        PaymentMethodPermissions.DELETE_PAYMENT_METHOD
    }

    SUPER_ADMIN = {
        *ADMIN,
        # Additional permissions for super admins can be added here
        # For example:
        # PermissionToSomething.SOMETHING
    }
