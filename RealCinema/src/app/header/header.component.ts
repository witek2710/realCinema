import { Component, OnInit } from '@angular/core';
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
        let account = {
          homeAccountId: accountInfo.homeAccountId,
          environment: accountInfo.environment,
          tenantId: accountInfo.tenantId,
          username: accountInfo.username,
          localAccountId: accountInfo.localAccountId,
          name: accountInfo.name,
          idTokenClaims: accountInfo.idTokenClaims,
        }
        localStorage.setItem('activeAcc', JSON.stringify(account));
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
    let JSONAccount = localStorage.getItem('activeAcc');
    let account = JSONAccount ? JSON.parse(JSONAccount) : undefined;
    return  account.name ?? account.username ?? 'User';
  }

  logOut(): void {
    this.ssoDataService.logout();
  }
}
