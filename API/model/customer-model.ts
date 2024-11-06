import mongoose, { Document, model, Schema } from "mongoose";


export interface ICustomer extends Document{
    custId: number;
    name:string;
    mobileNo:string;
    email:string;
    aadharNo:string;
    city:string;
    address:string;
}

const CustomerSchema: Schema = new mongoose.Schema({
    custId:{
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    name:{
        type: String,
        required: [true, 'Can\'t be Blank'],
    },
    mobileNo:{
        type: String,
        required: true,
        unique: true,
        length: [10, "Should be 10 Characters"]
    },
    email:{
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique:true,
        index:true
    },
    aadharNo:{
        type: String,
        required: true,
        unique: true,
        index: true,
        length: [12, 'Should be 12 Characters']
    },
    city:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }
})

export default model<ICustomer>("Customers", CustomerSchema);