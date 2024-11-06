import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "email": "",
    "password": ""
  }

  constructor(private loginService: LoginService, private router: Router) { }

  onLogin() {
    this.loginService.login(this.loginObj);
    
  }
}

