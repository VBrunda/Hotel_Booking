import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  url = "http://127.0.0.1:5000/customers";

  constructor(private http:HttpClient) { }

  getAllCustomers(){
    return this.http.get(`${this.url}/allCustomers`);
  }

  addUpdateCustomer(customers: any){
    return this.http.post(`${this.url}/addUpdateCustomers`, customers);
  }

  deleteCustomer(custId:number){
    return this.http.delete(`${this.url}/deleteCustomer?custId=${custId}`);
  }
}
