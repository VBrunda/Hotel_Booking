import { Router } from "express";
import { addUpdateRooms, deleteRoom, getAllRooms } from "../controllers/rooms-controller";

const roomsRoute = Router();

roomsRoute.get("/allRooms", getAllRooms);
roomsRoute.post("/addUpdateRoom", addUpdateRooms);
roomsRoute.delete("/deleteRoomById", deleteRoom)

export default roomsRoute;