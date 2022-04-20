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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardOverviewComponent,
    NavbarComponent,
    CarouselComponent,
    CinemaSelectorComponent,
    CinemaRepertoireComponent,
    CinemaRepertoireCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgImageSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
