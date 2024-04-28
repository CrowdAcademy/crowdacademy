from app.modules.Access.permissions import *


class Roles:
    STUDENT = {
        # Lesson Permissions
        LessonPermissions.VIEW_LESSON,

        # Resource Permission
        ResourcePermissions.VIEW_RESOURCE,

        # Challenge Permissions
        ChallengePermissions.VIEW_CHALLENGE,
        ChallengePermissions.CREATE_CHALLENGE,
        ChallengePermissions.EDIT_CHALLENGE,
        ChallengePermissions.DELETE_CHALLENGE,
    }
    
    PREMIUM_STUDENT = {
        *STUDENT, # All Student Permissions
        LessonPermissions.VIEW_PREMIUM_LESSON
    }


    INSTRUCTOR = {
        *STUDENT, # All  Student Permissions

        # Lesson Permissions
        LessonPermissions.EDIT_LESSON,
        LessonPermissions.CREATE_LESSON,
        LessonPermissions.DELETE_LESSON,
        
        # Resource Permissions
        ResourcePermissions.CREATE_RESOURCE,
        ResourcePermissions.EDIT_RESOURCE,
        ResourcePermissions.DELETE_RESOURCE,
    }

    MODERATOR = {
        *INSTRUCTOR, # All Instructor Permissions

        # Profile Permissions
        ProfilePermissions.VIEW_PROFILE,
        ProfilePermissions.EDIT_PROFILE,
        ProfilePermissions.CREATE_PROFILE,
        ProfilePermissions.DELETE_PROFILE,
       
        # Feedback Permissions
        FeedbackPermissions.HIDE_FEEDBACK,

        # User Permissions
        UserPermissions.VIEW_USER,
    }


    ADMIN = {
        *MODERATOR, # All Moderator Permissions

        # User Permissions
        UserPermissions.EDIT_USER,
        UserPermissions.CREATE_USER,
        UserPermissions.DELETE_USER,
        UserPermissions.SUSPEND_USER,

        # Feedback Permissions
        FeedbackPermissions.VIEW_FEEDBACK,
        FeedbackPermissions.CREATE_FEEDBACK,
        FeedbackPermissions.EDIT_FEEDBACK,
        FeedbackPermissions.DELETE_FEEDBACK,
        
        # Payment Permissions
        PaymentPermissions.VIEW_PAYMENT,

        # Payment Method Permissions
        PaymentMethodPermissions.VIEW_PAYMENT_METHOD,
        PaymentMethodPermissions.CREATE_PAYMENT_METHOD,
        PaymentMethodPermissions.EDIT_PAYMENT_METHOD,
        PaymentMethodPermissions.DELETE_PAYMENT_METHOD
    }

    SUPER_ADMIN = {
        *ADMIN, # All User Permissions

        # Payment Permissions
        PaymentPermissions.CREATE_PAYMENT,
        PaymentPermissions.EDIT_PAYMENT,
        PaymentPermissions.DELETE_PAYMENT
    }
