export class User {
    public _id: string;
    public username: string;
    public email: string;
    public password: string;
    public phoneNumber: string;

    constructor(_id: string, username: string = "", email: string, password: string, phoneNumber: string = "") {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}