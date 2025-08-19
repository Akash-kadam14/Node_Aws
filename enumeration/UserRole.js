const UserRole = class USerRole {
    getList () {
        return [
            UserRole.SuperAdmin,
            UserRole.NormalUser,
        ]
    }
}

UserRole.SuperAdmin = 1;
UserRole.NormalUser = 2;

module.exports = UserRole;