import mongoose from 'mongoose';

const RoomOptions = new mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    maxPeoples: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String
    },
    breakfastOption: {
        type: String
    },
    desc: {
        type: [String]
    },
    unavailableDates: [{start: Date, end: Date}]
})

export default mongoose.model('RoomOption', RoomOptions);