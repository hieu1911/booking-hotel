export class User {
    public id: string;
    public username: string;
    public email: string;
    public password: string;
    public phoneNumber: string;

    constructor(id: string, username: string = "", email: string, password: string, phoneNumber: string = "") {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}