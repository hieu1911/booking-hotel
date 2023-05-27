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
        twinBeds: {
            type: Number
        },
        queenBed: {
            type: Number
        },
        desc: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Room', RoomSchema);