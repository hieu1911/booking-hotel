export class RoomType {
    public _id: string;
    public size: number;
    public wifi: boolean;
    public balcony: boolean;
    public cityView: boolean;
    public airConditioning: boolean;
    public attachedBathroom: boolean;
    public flatScreenTV: boolean;
    public minibar: boolean;
    public privateBathroom: boolean;
    public bathtub: boolean;
    public soundproof: boolean;
    public patio: boolean;
    public oceanView: boolean;

    constructor(
        _id: string,
        size: number,
        wifi: boolean,
        balcony: boolean,
        cityView: boolean,
        airConditioning: boolean,
        attachedBathroom: boolean,
        flatScreenTV: boolean,
        minibar: boolean,
        privateBathroom: boolean,
        bathtub: boolean,
        soundproof: boolean,
        patio: boolean,
        oceanView: boolean
    ) {
        this._id = _id;
        this.size = size;
        this.wifi = wifi;
        this.balcony = balcony;
        this.cityView = cityView;
        this.airConditioning = airConditioning;
        this.attachedBathroom = attachedBathroom;
        this.flatScreenTV = flatScreenTV;
        this.minibar = minibar;
        this.privateBathroom =privateBathroom;
        this.bathtub = bathtub;
        this.soundproof = soundproof;
        this.patio = patio;
        this.oceanView = oceanView;
    }
}