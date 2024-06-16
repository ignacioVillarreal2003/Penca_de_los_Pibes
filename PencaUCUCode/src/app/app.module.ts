import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptor/authentication.interceptor';
import { Location } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserAccessComponent } from './components/user-access/user-access.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserPredictionsComponent } from './components/user-predictions/user-predictions.component';
import { UserRankingComponent } from './components/user-ranking/user-ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAccessComponent,
    AdminHomeComponent,
    UserHeaderComponent,
    UserHomeComponent,
    UserPredictionsComponent,
    UserRankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    /*{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    Location*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
