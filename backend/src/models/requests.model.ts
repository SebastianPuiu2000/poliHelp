import mongoose from 'mongoose';
import { SuppliesSchema, Supply } from './dropoff.model';

export type Request = {
    dropoffId: any,
    userId: any,
    supplies: Supply[],
    lat: number,
    lng: number
};

export const RequestSchema = new mongoose.Schema({
    dropoffId:{
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    supplies: [SuppliesSchema],
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

export const RequestModel = mongoose.model('Request', RequestSchema);
