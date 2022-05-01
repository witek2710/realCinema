import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './dashboard/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { CinemaSelectorComponent } from './dashboard/cinema-selector/cinema-selector.component';
import { CinemaRepertoireComponent } from './dashboard/cinema-repertoire/cinema-repertoire.component';
import { CinemaRepertoireCardComponent } from './dashboard/cinema-repertoire/cinema-repertoire-card/cinema-repertoire-card.component';
import { FooterComponent } from './footer/footer.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPerformanceClient } from '@azure/msal-common';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { LoginOverviewComponent } from './authentication/login/login-overview/login-overview.component';
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication ({
    auth: {
      clientId: '5a8355ce-3706-4c67-9fa0-b3082c9f4f94',
      redirectUri: 'http://localhost:4200'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardOverviewComponent,
    NavbarComponent,
    CarouselComponent,
    CinemaSelectorComponent,
    CinemaRepertoireComponent,
    CinemaRepertoireCardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgImageSliderModule,
    MsalModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
