import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    roomOptionID: {
        type: String,
        required: true
    },
    review: {
        type: String
    }, 
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
},
{ timestamps: true }
)

export default mongoose.model('Reservation', ReservationSchema);    