import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {
  allRooms: any[] = [];
  errorMsg = "";


  constructor(private roomService: RoomsService) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getAllRooms().then(res => {
      if (res.success) {
        this.allRooms = res.data;
      }else{
        this.errorMsg = res.message;
      }
    })
  }

  newRoom() { 
    const roomObj: any = {
      extensionNo: "",
      isACAvailable: false,
      isAvailable: false,
      name: "",
      roomCapacity: 0,
      roomId: 0,
      roomTariff: 0
    }
    this.allRooms.unshift(roomObj);
  }

  updateRooms() {
    this.roomService.addUpdateRooms(this.allRooms).then(res => {
      if(!res.success){
        this.errorMsg = res.message;
      }
    })
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).then(res => {
      if (!res.success) {
        this.errorMsg = res.message;
      }
    })
  }

}
