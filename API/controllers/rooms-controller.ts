import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import Rooms, { IRoom } from "../model/rooms-model";
import { createSuccess } from "../utils/successResponse";

const fields = [{ roomId: 1 }, { name: 1 }, { isACAvailable: 1 }, { roomCapacity: 1 }, { isAvailable: 1 }, { extensionNo: 1 }, { roomTariff: 1 }]

export const getAllRooms = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const rooms = await Rooms.find();
        if (rooms.length <= 0) return next(new ErrorResponse('No Rooms found', 404));
        return next(createSuccess(200, "Rooms found", rooms));
    } catch (error: any) {
        return next(new ErrorResponse(`Couldn't fetch Rooms ${error.message}`, 500))
    }
}

export const addUpdateRooms = async (request: Request, response: Response, next: NextFunction) => {
    const rooms: IRoom[] = request.body;
    try {
        for (const room of rooms) {
            // const existingRoom = await Rooms.findOne({ roomId: room.roomId });
            // if (existingRoom) {
            //     await Rooms.findOneAndUpdate({ roomId: room.roomId }, // conditions
            //         { $set: room }, // update
            //         { new: true, runValidators: true });
            // } else {
            //     // Calculate new roomId as maxId + 1
            //     const maxRoom = await Rooms.findOne({}, { roomId: 1 }).sort({ roomId: -1 });
            //     const newRoomId = maxRoom ? maxRoom.roomId + 1 : 1; // Start from 1 if no rooms exist
            //     room.roomId = newRoomId;
            //     // Create a new room with the new roomId
            //     await Rooms.create(room);
            // }
            if(room.roomId > 0){
                const newRoom = await Rooms.findOneAndUpdate({ roomId: room.roomId }, // conditions
                    { $set: room }, // update
                    { new: true, runValidators: true });
            }else{                
                   // Calculate new roomId as maxId + 1
                const maxRoom = await Rooms.findOne({}, { roomId: 1 }).sort({ roomId: -1 });
                const newRoomId = maxRoom ? maxRoom.roomId + 1 : 1; // Start from 1 if no rooms exist
                room.roomId = newRoomId;
                // Create a new room with the new roomId
                await Rooms.create(room); 
            }
            
        }
        return next(createSuccess(200, 'Rooms Created/Updated Successfully', {}));
    } catch (error: any) {
        return next(new ErrorResponse(`Couldn\'t Update Rooms ${error.message}`, 500));
    }
}

export const deleteRoom = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.query.roomId;
    try {
        const existingRoom = await Rooms.findOne({ roomId: id });
        if(existingRoom){
            const deleteRoom = await Rooms.findOneAndDelete({ roomId: id });
            
            return next(createSuccess(200, 'Room Deleted Successfully', { roomId: id }));
        }
        return next(new ErrorResponse(`Couldn't find Room ${id}`, 404));
    } catch (error: any) {
        return next(new ErrorResponse(`Couldn't delete Rooms`, 500));
    }

}