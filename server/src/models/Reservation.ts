import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    roomID: {
        type: String,
        required: true
    },
    review: {
        type: String
    }
})

export default mongoose.model('Reservation', ReservationSchema);