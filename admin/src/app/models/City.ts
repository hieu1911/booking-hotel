export class City {
    public _id: string;
    public countryID: string;
    public name: string;
    public desc: string;
    public photos: [string];
    public thumbnail: string;

    constructor(_id: string, countryID: string, name: string, desc: string, photos: [string], thumbnail: string) {
        this._id = _id;
        this.countryID = countryID;
        this.name = name;
        this.desc = desc;
        this.photos = photos;
        this.thumbnail = thumbnail;
    }
}