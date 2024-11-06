import mongoose, { model, Schema, Document } from 'mongoose';

export interface IRoom extends Document{
    roomId:number;
    name:string;
    isACAvailable: boolean;
    roomCapacity:number;
    isAvailable:boolean;
    extensionNo:string;
    roomTariff:number;
}

const RoomSchema: Schema = new Schema({
    roomId:{
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    name:{
        type: String,
        required: true,
    },
    isACAvailable: {
        type: Boolean,
        required: true,
    },
    roomCapacity:{
        type: Number,
        required: true,
    },
    isAvailable:{
        type: Boolean,
        required: true,
    },
    extensionNo:{
        type: String,
        required: true,
    },
    roomTariff:{
        type: Number,
        required: true,
    }
},{
    timestamps: true
})

export default model<IRoom>("Rooms", RoomSchema);