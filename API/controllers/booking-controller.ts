import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import Bookings, { IBooking } from "../model/booking-model";
import { createSuccess } from "../utils/successResponse";
import Customers from "../model/customer-model";
import Rooms from "../model/rooms-model";

export const getAllBookings = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const bookings = await Bookings.find()
            .populate("room", "roomId name isAvailable roomTariff") // Adjust the fields to retrieve from Rooms
            .populate({ path: 'customer', select: 'custId name email aadharNo' }); // Adjust fields as necessary

        if (bookings.length > 0) return next(createSuccess(200, "Bookings found", bookings));
        return next(createSuccess(200, "No Bookings Found", []));
    } catch (error: any) {
        return next(new ErrorResponse(`Interval Server Error: ${error.message}`, 500));
    }
}

export const bookRoom = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const bookingDetails = request.body;
        let newBooking, updateBooking;
        const customer = await Customers.findOne({ custId: bookingDetails.custId });
        const room = await Rooms.findOne({ roomId: bookingDetails.roomId });
        const updatedBooking: IBooking = { customer, room, ...bookingDetails }

        if (bookingDetails.bookingId === 0) {
            const maxBookingId = await Bookings.findOne({}, { bookingId: 1 }).sort({ bookingId: -1 });
            const newBookingId = maxBookingId ? maxBookingId.bookingId + 1 : 4590;
            updatedBooking.bookingId = newBookingId;
            newBooking = await Bookings.create(updatedBooking);
        } else {
            updateBooking = await Bookings.findOneAndUpdate({ bookingId: updatedBooking.bookingId }, { $set: updatedBooking },
                { new: true, runValidators: true }
            )
        }
        // Extract bookingId from either newBooking or updateBooking
        const bookingId = newBooking ? newBooking.bookingId : updateBooking?.bookingId;

        return next(createSuccess(200, "Booking Successfull", { bookingId }));

    } catch (error: any) {
        return next(new ErrorResponse(`Interval Server Error: ${error.message}`, 500));
    }
}

export const getBookingById = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.query.bookingId;
        const booking = await Bookings.findOne({ bookingId: id })
            .populate("room", "roomId name isAvailable roomTariff") // Adjust the fields to retrieve from Rooms
            .populate({ path: 'customer', select: 'custId name email aadharNo' }); // Adjust fields as necessary;

        if (!booking) return next(new ErrorResponse("Unable to find Booking", 404));

        return next(createSuccess(200, 'Booking details found', { booking }));

    } catch (error: any) {
        return next(new ErrorResponse(`Interval Server Error: ${error.message}`, 500));
    }
}

export const cancelBooking = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.query.bookingId;
        const existingBooking = await Bookings.findOne({ bookingId: id });
        if (existingBooking) {
            await Bookings.findOneAndDelete({ bookingId: id });
            return next(createSuccess(200, "Canceled Booking Successfully", { id }));
        }
        return next(new ErrorResponse("Unable to find Booking", 404));
    } catch (error: any) {
        return next(new ErrorResponse(`Interval Server Error: ${error.message}`, 500));
    }
}

export const filterByMonth = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { month, year } = request.query;

        if (!month || !year) {
            return next(new ErrorResponse('Month and Year are required', 400));
        }

        const bookings = await Bookings.find()
            .populate("room", "roomId name isACAvailable extensionNo roomCapacity roomTariff") // Adjust the fields to retrieve from Rooms
            .populate({ path: 'customer', select: 'name email aadharNo mobileNo city address' }); // Adjust fields as necessary;

        const filteredBooknings = bookings.filter((booking: any) => {
            const fromDate = new Date(booking.bookingFromDate);
            const toDate = new Date(booking.bookingToDate);
            return ((fromDate.getMonth() + 1 === Number(month) || toDate.getMonth()+1 >= Number(month)) && fromDate.getFullYear() === Number(year));
        });

        if (filteredBooknings) return next(createSuccess(200, `Bookings for the Month ${month}/${year}`, filteredBooknings));

        return next(createSuccess(200, `No Bookings found for Month ${month}/${year}`, []))

    } catch (error: any) {
        return next(new ErrorResponse(`Internal Server Error: ${error.message}`, 500));
    }
}

export const filterBookings = async (request: Request, response: Response, next: NextFunction) => {
    const { page = 1, limit = 10, sort = 'bookingId', order = 'asc', category } = request.query;

    try {
        const query = {};

        const bookings = await Bookings.find()
            .sort({ [String(sort)]: order === 'asc' ? 1 : -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

            const total = await Bookings.countDocuments(query);

            response.json({
              total,
              page: Number(page),
              totalPages: Math.ceil(total / Number(limit)),
              bookings,
            });
    } catch (error) {

    }

}