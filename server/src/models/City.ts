import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
    countryID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    thumbnail: {
        type: String
    },
    photos: {
        type: [String]
    }
})

export default mongoose.model('City', CitySchema);