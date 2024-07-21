export class User{
    constructor(name,email,password,TypeOfUser,id){
        this.email=email;
        this.name=name;
        this.password=password;
        this.TypeOfUser=TypeOfUser;
        this.id=id;
    }
    static signUp(name, email, password, TypeOfUser) {
        const newUser = new User(name, email, password, TypeOfUser, users.length + 1);
        users.push(newUser);
        return newUser;
    }
    static signIn(email, password) {
        console.log(email + " " + password);
        console.log(users);
       const user = users.find(e => e.email === email && e.password === password);
        return user;
    }
    static getAll(){
        return users;
    }

}
let users=[{
    name:"seller User",
    email:"seller@2ecom.in",
    password:"password2",
    type:'seller',
    id:1,
},
{
    name:"Customer User",
    email:"customer@2ecom.in",
    password:"password3",
    type:"customer",
    id:2,
},
]