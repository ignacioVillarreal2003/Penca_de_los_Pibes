import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IngresoComponent } from './ingreso/ingreso.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { JuegoComponent } from './juego/juego.component';
import { HeaderUserComponent } from './header-user/header-user.component';

@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
    AdminMenuComponent,
    UserMenuComponent,
    JuegoComponent,
    HeaderUserComponent
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
