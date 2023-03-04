import mongoose from "mongoose";

const Schema = mongoose.Schema;

enum userRole {
    Delivery,
    Donator,
    ShelterProvider,
    Consumer
};

export const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: userRole
    }        
});
