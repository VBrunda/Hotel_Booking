import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminLayoutComponent {
  loggedUserDetails:any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private loginService:LoginService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.onLoad();
  }
}

  onLoad(){
    this.loggedUserDetails = `adm_${this.loginService.getLoggedInUser().userId}`;
  }

  onLogout(){
    this.loggedUserDetails = undefined;
    localStorage.removeItem("hotelUsers");
  }

}
