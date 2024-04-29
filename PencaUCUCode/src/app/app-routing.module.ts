import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthUserComponent } from './components/auth-user/auth-user.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { HomeComponent } from './components/home/home.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { RankingComponent } from './components/ranking/ranking.component';

const routes: Routes = [
  { path: '', component: AuthUserComponent },
  { path: 'admin', component: AdminMenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'predictions', component: PredictionsComponent },
  { path: 'ranking', component: RankingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
