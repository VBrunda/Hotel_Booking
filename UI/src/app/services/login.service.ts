import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:5000/user";
  loggedIn = false;

  constructor(private http:HttpClient, private router:Router) { }

  login(data:any){
    debugger;
  this.http.post(`${this.url}/Login`, data).subscribe((response:any) => {
    if (response.success) {
      localStorage.setItem("hotelUsers", JSON.stringify(response.data)); // Ensure to stringify if it's an object
      this.loggedIn = true;
      const role = response.data.role;
      if(role === "admin"){
      this.router.navigateByUrl("/admin");
    }else this.router.navigateByUrl("/home");
    }
  },(error: any) => {
      console.error('Login failed', error.message);
      // Handle the error appropriately, e.g., showing an alert or message
    });
}

logout(){
  localStorage.removeItem("hotelUsers");
  this.loggedIn = false;
}

isLoggedIn(): boolean {
  const user = this.getLoggedInUser();
  return user;
}

getAllUsers(){
  return this.http.get(`${this.url}/GetAllUsers`);
}

addUpdateUser(user:any){
  return this.http.post(`${this.url}/AddUpdateUser`, user);
}

removeUser(id:any){
  return this.http.delete(`${this.url}/DeleteUserById?id=${id}`);
}

/* Function to generate combination of password */
generatePass() {
  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#$';

  for (let i = 0; i <= 8; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
  }
  return pass;
}

getLoggedInUser(){
  const user = localStorage.getItem("hotelUsers");
  if(user) return JSON.parse(user);
}

}
