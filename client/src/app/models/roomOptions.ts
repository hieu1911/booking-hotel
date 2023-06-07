export class RoomOptions {
    public _id: string;
    public roomID: string;
    public maxPeoples: number;
    public price: number;
    public title: string;
    public breakfastOption: string;
    public desc: string[];
    public unavailableDates: {start: Date, end: Date}[];

    constructor(
        _id: string,
        roomID: string,
        maxPeoples: number,
        price: number,
        title: string,
        breakfastOption: string,
        desc: string[],
        unavailableDates: {start: Date, end: Date}[]
    ) {
        this._id = _id;
        this.roomID = roomID;
        this.maxPeoples = maxPeoples;
        this.price = price;
        this.title = title;
        this.breakfastOption = breakfastOption;
        this.desc = desc;
        this.unavailableDates = unavailableDates;
    }
}