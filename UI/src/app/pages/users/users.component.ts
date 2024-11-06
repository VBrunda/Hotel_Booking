import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  usersList: any[] = [];
  filteredUsersList: any[] = [];
  responseMsg = '';

  userEditObj: any;
  searchString: string = '';
  userObj: any = {
    userId: 0,
    userName: '',
    email: '',
    password: '',
    role: 'staff'
  };

  constructor(private service: LoginService) { }

  ngOnInit(): void {
    this.responseMsg = "";
    this.getUsers();
  }

  getUsers() {
    this.service.getAllUsers().subscribe((res: any) => {
      if (res.success) {
        this.usersList = res.data;
        this.filteredUsersList = this.usersList;
      }
    })
  }

  onSubmit() {
    if (!this.userObj.password) {
      this.userObj.password = this.service.generatePass();
    }
    this.service.addUpdateUser(this.userObj).subscribe((res: any) => {
      if (res.success) {
        this.userObj = {
          userId: 0,
          userName: '',
          email: '',
          password: '',
          role: 'staff'
        }
        
        this.getUsers();
      }
    });
  }

  onEdit(usrData: any) {
    this.userEditObj = JSON.stringify(usrData);
    const strObj = JSON.stringify(usrData);
    this.userObj = JSON.parse(strObj);
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure u want to delete?")
    if (isDelete) {
      this.service.removeUser(id).subscribe((res: any) => {
        if (res.success) {
          this.getUsers();
        }
        this.responseMsg = res.message;
      });
    }
  }

  onSearch(searchTxt: any) {
    const lowerSearchTxt = searchTxt.toLowerCase();
    if (searchTxt == '') {
      this.filteredUsersList = this.usersList;
    } else {
      this.filteredUsersList = this.usersList.filter(users => {
        return users.userId.toString().includes(lowerSearchTxt) ||
          users.userName.toLowerCase().includes(lowerSearchTxt) ||
          users.email.toLowerCase().includes(lowerSearchTxt) ||
          users.role.toLowerCase().includes(lowerSearchTxt)
      });
    }
  }

}
