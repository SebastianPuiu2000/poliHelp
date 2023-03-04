import mongoose from 'mongoose';

export type Dropoff = {
    userId: any,
    lat: number,
    lgn: number
};

export const dropoffSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lgn: {
        type: Number,
        required: true
    }
});

export const DropoffModel = mongoose.model('Dropoff', dropoffSchema);
