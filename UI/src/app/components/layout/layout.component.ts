import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  loggedUserDetails:any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private loginService:LoginService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.onLoad();
  }
}

  onLoad(){
    this.loggedUserDetails = this.loginService.getLoggedInUser().userId;
  }

  onLogout(){
    this.loggedUserDetails = undefined;
    this.loginService.logout();
  }

}
