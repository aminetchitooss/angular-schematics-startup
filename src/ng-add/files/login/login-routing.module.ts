import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailedLoginComponent } from './failed-login/failed-login.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'failed', component: FailedLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
