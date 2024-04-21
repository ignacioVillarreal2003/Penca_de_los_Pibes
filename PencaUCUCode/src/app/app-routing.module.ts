import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IngresoComponent } from './ingreso/ingreso.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

const routes: Routes = [
  { path: '', component: IngresoComponent },
  { path: 'admin', component: AdminMenuComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
