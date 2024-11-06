import { IRoom } from "../model/rooms-model";


class RoomService {
  private rooms: IRoom[] = [];

  getLastRoomId(): number {
    if (this.rooms.length === 0) {
      return 0;
    }
    return Math.max(...this.rooms.map((room) => room.roomId));
  }
}

export const roomService = new RoomService();