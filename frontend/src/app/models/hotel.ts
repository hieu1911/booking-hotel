export class Hotel {
    public id: string;
    public cityID: string;
    public name: string;
    public type: string;
    public address: string;
    public distance: number;
    public photos: string[];
    public roomDesc: string;
    public desc: string[];
    public review: string;
    public rating: number;
    public cheapestPrice: number;
    public details: string[];
    
    constructor(
        id: string,
        cityID: string,
        name: string,
        type: string,
        address: string,
        distance: number,
        photos: string[],
        roomDesc: string,
        desc: string[],
        review: string,
        rating: number,
        cheapestPrice: number,
        details: string[]
    ) {
        this.id = id;
        this.cityID = cityID;
        this.name = name;
        this.type = type;
        this.address = address;
        this.distance = distance;
        this.photos = photos;
        this.roomDesc = roomDesc;
        this.desc = desc;
        this.review = review;
        this.rating = rating;
        this.cheapestPrice = cheapestPrice;
        this.details = details;
    }
}