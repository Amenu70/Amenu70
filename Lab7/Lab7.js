//Question 1
// It leads to an error because in the ask password this will be lost and it will refer to the window 

function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'Jhon',
    
    loginOk() {
        alert(`${this.name} logged in`);
    },

    loginFail() {
        alert(`${this.name} failed to log in`);
    }
};

//Using Wrapper

//askPassword(function () { user.loginOk(); }, function () { user.loginFail(); });
//askPassword(() => user.loginOk(), () => user.loginFail());

//Using bind
//askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

//Using call
//askPassword(()=>user.loginOk.call(user), ()=>user.loginFail.call(user));

//Using apply
askPassword(()=>user.loginOk.apply(user), ()=>user.loginFail.apply(user));


// Question 2

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
        this.students.forEach(function (student) {
            console.log(this.title + ": " + student);
        }.bind(this));
    }
};
group.showList();