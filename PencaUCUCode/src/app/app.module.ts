import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptor/authentication.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthUserComponent } from './components/auth-user/auth-user.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HomeComponent } from './components/home/home.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { RankingComponent } from './components/ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthUserComponent,
    AdminMenuComponent,
    HeaderUserComponent,
    HomeComponent,
    PredictionsComponent,
    RankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    [
      { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
