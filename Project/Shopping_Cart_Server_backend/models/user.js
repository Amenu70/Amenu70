const usersdb=require('../data/userdatabase')

class User{
    constructor(userName, email,password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    static autenticateUser(email, password) {
        const user = usersdb.find(user => user.email === email && user.password === password);
        return user;
    }
            
}

module.exports = User;