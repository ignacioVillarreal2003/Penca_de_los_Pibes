import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthUserComponent } from './components/auth-user/auth-user.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { PencaComponent } from './components/penca/penca.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthUserComponent,
    AdminMenuComponent,
    HeaderUserComponent,
    HomeComponent,
    GamesComponent,
    PencaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
