import mongoose from 'mongoose';

const RoomTypeSchema = new mongoose.Schema({
    size: {
        type: Number, 
        required: true
    },
    wifi: {
        type: Boolean,
        required: true
    },
    balcony: {
        type: Boolean,
        required: true
    },
    cityView: {
        type: Boolean,
        required: true
    },
    airConditioning: {
        type: Boolean,
        required: true
    },
    attachedBathroom: {
        type: Boolean,
        required: true
    },
    flatScreenTV: {
        type: Boolean,
        required: true
    },
    miniBar: {
        type: Boolean,
        required: true
    },
    privateBathroom: {
        type: Boolean,
        required: true
    },
    bathtub: {
        type: Boolean,
        required: true
    },
    soundproof: {
        type: Boolean,
        required: true
    },
    patio: {
        type: Boolean,
        required: true
    },
    oceanView: {
        type: Boolean,
        required: true
    },
    
})

export default mongoose.model('RoomType', RoomTypeSchema);