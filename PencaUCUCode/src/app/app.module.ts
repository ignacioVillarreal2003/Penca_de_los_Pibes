import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserAccessComponent } from './components/user-access/user-access.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserPredictionsComponent } from './components/user-predictions/user-predictions.component';
import { UserRankingComponent } from './components/user-ranking/user-ranking.component';
import { UserFixtureComponent } from './components/user-fixture/user-fixture.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAccessComponent,
    AdminHomeComponent,
    UserHeaderComponent,
    UserHomeComponent,
    UserPredictionsComponent,
    UserRankingComponent,
    UserFixtureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
