import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthUserComponent } from './components/auth-user/auth-user.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { PencaComponent } from './components/penca/penca.component';

const routes: Routes = [
  { path: '', component: AuthUserComponent },
  { path: 'admin', component: AdminMenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'penca', component: PencaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
