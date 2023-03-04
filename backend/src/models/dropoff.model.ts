import mongoose from 'mongoose';

export type Supply = {
    type: string,
    quantity: number
};

export type Dropoff = {
    userId: any,
    lat: number,
    lgn: number,
    supplies: Supply[]
};

const SuppliesSchema = new mongoose.Schema({
    type: String,
    quantity: Number
});

export const DropoffSchema = new mongoose.Schema({
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
    },
    supplies: [SuppliesSchema]
});

export const DropoffModel = mongoose.model('Dropoff', DropoffSchema);
