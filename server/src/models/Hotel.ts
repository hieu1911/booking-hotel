import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
    cityID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    photos: {
        type: [String]
    },
    roomDesc: {
        type: String
    },
    desc: {
        type: [String],
        required: true
    },
    review: {
        type: String
    },
    rating: {
        type: Number,
        max: 10,
        min: 0,
        default: 10
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    details: {
        type: [String]
    }
})

export default mongoose.model('Hotel', HotelSchema);