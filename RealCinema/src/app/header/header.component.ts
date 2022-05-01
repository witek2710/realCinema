import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { SsoDataService } from '../authentication/sso-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private ssoDataService: SsoDataService,
    protected readonly router: Router) {
    
  }
  public loggedIn = false;
  public activeAcc: AccountInfo | undefined;

  keepLoggedInStatusUpdated(): void {
    this.ssoDataService.getAccountInfo().subscribe(accountInfo =>{
      if(!!accountInfo) {
        this.loggedIn = true;
        this.activeAcc = accountInfo;
      }
    });
    //this.loggedIn = this.msalService.instance.getActiveAccount() === null? false : true;
  }

  ngOnInit(): void {
    this.ssoDataService.setActiveAccountAfterRedirect();
    this.keepLoggedInStatusUpdated();
    console.log(this.loggedIn);
    console.log(this.activeAcc);
  }

  goToLoginPage(): void {
    this.router.navigate([`../login`]);
  }
  getUsername(): string {
    return this.activeAcc?.name ?? '';
  }

  logOut(): void {
    this.ssoDataService.logout();
  }
}
