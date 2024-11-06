import { Document, model, ObjectId, Schema } from "mongoose";

export interface IGuest extends Document{
    _id: ObjectId[];
    customerName: string;
    aadharCardNo: string;
  }

export interface IBooking extends Document{
        bookingId: number;
        bookingFromDate: Date;
        bookingToDate: Date;
        createdDate: Date;
        narration: string;
        createBy: number;
        room: ObjectId;
        customer: ObjectId;
        guestDetails: IGuest[];
}

const GuestSchema: Schema = new Schema({
    _id:{
        type:[Schema.Types.ObjectId],
        required: true
    },
    name:{
        type:String,
        required: true
    },
    aadharNo:{
        type:String,
        required: true
    },
})

const BookingSchema: Schema = new Schema({
    bookingId:{
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    bookingFromDate:{
        type: Date,
        required: true,
    },
    bookingToDate:{
        type: Date,
        required: true,
    },    
    createdDate:{
        type: Date,
        required: true,
    },
    narration:{
        type: String,
    },
    createBy:{
        type: Number,
        required: true,
    },
    room:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Rooms"
    },
    customer:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Customers"
    },
    guestDetails:{
        type: [GuestSchema],
        reuired: true
    }
});

export default model<IBooking>("Bookings", BookingSchema);