export class City {
    public id: string;
    public countryID: string;
    public name: string;
    public desc: string;
    public photos: [string];
    public thumbnail: string;

    constructor(id: string, countryID: string, name: string, desc: string, photos: [string], thumbnail: string) {
        this.id = id;
        this.countryID = countryID;
        this.name = name;
        this.desc = desc;
        this.photos = photos;
        this.thumbnail = thumbnail;
    }
}