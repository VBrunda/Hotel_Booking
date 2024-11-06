import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customersList: any[] = [];
  message = "";
  customerEdit:any;

  tableHeader = ["Sr No.", "Name", "Contact No.", "Email", "Aadhar No.", "Address", "City", "Actions"];


  constructor(private custService:CustomersService){}

  ngOnInit(): void {
    this.message = "";
    this.getAllCustomers();
  }

  async getAllCustomers(){
    this.custService.getAllCustomers().subscribe((response:any) => {
      if(response.success){
        this.customersList = response.data;
      }      
    });
  }

  updateCustomer(customer:any){
    debugger;
    this.custService.addUpdateCustomer(customer).subscribe((response:any) => {
      if(response.success){
        this.getAllCustomers();
      }
       this.message = response.message;
    })
  }

  newCustomer(){
    const custObj:any = {
      custId: 0,
      name: "",
      mobileNo: "",
      email: "",
      aadharNo: "",
      city: "",
      address: "",
      isEdit: true
    }
    this.customersList.unshift(custObj);
  }

  onEdit(cust:any){
    debugger;
    this.customerEdit = JSON.stringify(cust);
    cust.isEdit = true;
  }

  onCancelUpdate(customer:any){
    const oldCustObj = JSON.parse(this.customerEdit);
    customer.name = oldCustObj.name;
    customer.mobileNo = oldCustObj.mobileNo;
    customer.email = oldCustObj.email;
    customer.aadharNo = oldCustObj.aadharNo;
    customer.address = oldCustObj.address;
    customer.city  = oldCustObj.city;
    customer.isEdit = false;
  }

  onDelete(id:number){
    this.custService.deleteCustomer(id).subscribe((response:any) => {
      this.message = response.message;
      this.getAllCustomers();
    })
  }
  
}
