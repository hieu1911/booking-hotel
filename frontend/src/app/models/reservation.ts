export class Reservation {
    public _id: string;
    public userID: string;
    public roomOptionID: string;
    public startDate: Date;
    public endDate: Date;

    constructor(_id: string, userID: string, roomOptionID: string, startDate: Date, endDate: Date) {
        this._id = _id;
        this.userID = userID;
        this.roomOptionID = roomOptionID;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}