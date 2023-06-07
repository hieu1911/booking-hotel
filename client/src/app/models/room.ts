export class Room {
    public _id: string;
    public hotelID: string;
    public roomTypeID: string;
    public title: string;
    public twinBeds: number;
    public queenBed: number;
    public desc: string;

    constructor(_id: string, hotelID: string, roomTypeID: string, title: string, twinBeds: number, queenBed: number, desc: string) {
        this._id = _id;
        this.hotelID = hotelID;
        this.roomTypeID= roomTypeID;
        this.title = title;
        this.twinBeds = twinBeds;
        this.queenBed = queenBed;
        this.desc = desc;
    }
}