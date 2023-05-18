import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
        hotelID: {
            type: String,
            required: true
        },
        roomTypeID: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        maxPeople: {
            type: Number,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Room', RoomSchema);