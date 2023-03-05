import mongoose from 'mongoose';

export type Shelter = {
    quantity: number,
    userId: any,        // id of user who owns the shelter
    userIds: any[],     // ids of users who are currently at the shelter
    lat: number,
    lng: number
};

export const ShelterSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userIds: [String],
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

export const ShelterModel = mongoose.model('Shelter', ShelterSchema);
