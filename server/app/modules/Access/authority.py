from app.modules.Access.roles import Roles
from enum import Enum
from app.utils.consts import REQUIRED_FIELDS



class Authority(Enum):
    SUPER_ADMIN = 0
    ADMIN = 1
    MODERATOR = 2
    INSTRUCTOR = 3
    PREMIUM_STUDENT = 4
    STUDENT = 5

    @staticmethod
    def from_role(role):
        role_map = {
            Roles.SUPER_ADMIN: Authority.SUPER_ADMIN,
            Roles.ADMIN: Authority.ADMIN,
            Roles.MODERATOR: Authority.MODERATOR,
            Roles.INSTRUCTOR: Authority.INSTRUCTOR,
            Roles.PREMIUM_STUDENT: Authority.PREMIUM_STUDENT,
            Roles.STUDENT: Authority.STUDENT
        }
        return role_map.get(role, Authority.STUDENT)

    @classmethod
    def highest_authority(cls, roles):
        highest = Authority.STUDENT  # Assumes STUDENT is the lowest
        for role in roles:
            authority = cls.from_role(role)
            if authority < highest:
                highest = authority
        return highest

    @classmethod
    def check_permission(cls, current_user, user, attribute, value):
        if attribute == REQUIRED_FIELDS.ROLES:
            if current_user.authority == cls.SUPER_ADMIN:
                return True  # SuperAdmin can edit anything

            # Ensure the highest role the current user can assign is not higher than their own
            highest_new_role_authority = cls.highest_authority(value)
            if current_user.authority <= highest_new_role_authority:
                return False  # Cannot assign role equal or higher to themselves unless SuperAdmin

            if current_user.authority > user.authority:
                return True  # Current user can change roles of users with lower authority

            return False  # Fails if trying to edit user of same or higher authority

        elif attribute == REQUIRED_FIELDS.PERMISSIONS:
            if current_user.authority == cls.SUPER_ADMIN:
                return True  # SuperAdmin can assign or remove any permissions

            if current_user.authority > user.authority:
                return True  # Admin or higher can edit permissions of lower authority users

            return False  # Fails if not higher authority

        return True  # For all other attributes, no special permissions are required
