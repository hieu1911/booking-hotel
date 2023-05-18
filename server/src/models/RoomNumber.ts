import mongoose from 'mongoose';

const RoomNumberSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    unAvailableDates: {
        type: [Date],
    },
    desc: {
        type: String,
    },
})

export default mongoose.model('RoomNumber', RoomNumberSchema);