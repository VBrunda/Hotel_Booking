import mongoose, { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
    userId: number;
    userName:string;
    email:string;
    password:string;
    role:string;
}

const UserSchema: Schema = new mongoose.Schema({
    userId: {
        type: Number,
        lowercase: true,
        required: [true, "Can't be blank"]
    },
    userName: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"]
    },
    password: {
        type: String,
        required: true,
        // select: false,
        minlength:  [8, "Please use minimum of 8 characters"],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique:true,
        index:true
    },
    role: {
        type: String,
        lowercase: true,
        required: true,
    }
},
    {
        timestamps: true    
})

export default model<IUser>("User", UserSchema);