const UserRole = class USerRole {
    static getList () {
        return [
            UserRole.SuperAdmin,
            UserRole.NormalUser,
        ]
    }
}

UserRole.SuperAdmin = 1;
UserRole.NormalUser = 2;

module.exports = UserRole;