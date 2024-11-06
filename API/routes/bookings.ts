import { Router } from "express";
import { getAllBookings, bookRoom, getBookingById, cancelBooking, filterByMonth, filterBookings } from "../controllers/booking-controller";

const bookingRouter = Router();

bookingRouter.get('/allBookings', getAllBookings);
bookingRouter.get('/getBookingsByMonth',filterByMonth);
bookingRouter.get('/filterBookings', filterBookings);
bookingRouter.get('/getBookingById',getBookingById);
bookingRouter.post('/bookRoom', bookRoom);
bookingRouter.delete('/cancelBookingById', cancelBooking);

export default bookingRouter