import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum userRole {
    Delivery = 'delivery',
    Donator = 'donate',
    ShelterProvider = 'provideShelter',
    ShelterConsumer = 'needShelter',
    SuppliesConsumer = 'needSupplies'
};

export type User = {
    name: string,
    username: string,
    password: string,
    role: userRole
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
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

// Index username (faster searches)
userSchema.index({ name: 1 });

export const UserModel = mongoose.model('User', userSchema);

export async function createUser(user: User): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    try {
        await UserModel.create({
            name: user.name,
            username: user.username,
            password: hash,
            role: user.role
        });
        
        return 'OK';
    } catch (error) {
        console.warn(error);

        if (error instanceof Error) {
            return error.message;
        }
        return 'Error';
    }
};
