import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  url = "http://127.0.0.1:5000/rooms";

  constructor() { }

  async getAllRooms(): Promise<any> {
    try {
      const rooms = await fetch(`${this.url}/allRooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await rooms.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Rethrow for component handling
    }
  }

  async addUpdateRooms(rooms: any[]): Promise<any> {
    try {
      const result = await fetch(`${this.url}/addUpdateRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rooms)
      });
      return await result.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Rethrow for component handling
    }
  }

  async deleteRoom(roomId: number): Promise<any> {
    try {
      const response = await fetch(`${this.url}/deleteRoomById?roomId=${roomId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers you need, such as Authorization
        },
      });
  
       return await response.json();
    } catch (error) {
      console.error('Failed to delete resource:', error);
    }
  }
}
