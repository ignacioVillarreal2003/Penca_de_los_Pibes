import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAccessComponent } from './components/user-access/user-access.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserPredictionsComponent } from './components/user-predictions/user-predictions.component';
import { UserRankingComponent } from './components/user-ranking/user-ranking.component';
import { UserFixtureComponent } from './components/user-fixture/user-fixture.component';

const routes: Routes = [
  { path: '', component: UserAccessComponent },
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'userhome', component: UserHomeComponent },
  { path: 'userPredictions', component: UserPredictionsComponent },
  { path: 'userRanking', component: UserRankingComponent },
  { path: 'userFixture', component: UserFixtureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
