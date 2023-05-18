import mongoose from 'mongoose';

const RoomTypeSchema = new mongoose.Schema({
    wifi: {
        type: Boolean,
        required: true
    },
    AC: {
        type: Boolean,
        required: true
    },
    heater: {
        type: Boolean,
        required: true
    },
    otherFacilities: {
        type: [String]
    }
})

export default mongoose.model('RoomType', RoomTypeSchema);