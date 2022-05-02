import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public username: string = 'User';

  keepLoggedInStatusUpdated(): void {
    this.ssoDataService.getAccountInfo().subscribe(accountInfo =>{
      if(!!accountInfo) {
        this.loggedIn = true;
        this.activeAcc = accountInfo;
        
      }
    });
  }

  ngOnInit(): void {
    this.ssoDataService.setActiveAccountAfterRedirect();
    this.keepLoggedInStatusUpdated();
  }

  goToLoginPage(): void {
    this.router.navigate([`../login`]);
  }

  getUsername(): string {
    return  this.activeAcc?.name ?? this.activeAcc?.username ?? 'User';
  }

  logOut(): void {
    this.ssoDataService.logout();
  }
}
