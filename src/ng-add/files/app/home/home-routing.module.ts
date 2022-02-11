import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DEFAULT_ROUTE, ROUTING_SETTING } from '@globalUtils/constants';
import { UserGuard } from '@guards/user.guard';
import { HomeComponent } from './home.component';
import { SettingsGuard } from '@guards/settings.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: ROUTING_SETTING, loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), data: { preload: false }, canActivate: [SettingsGuard] },
      { path: '**', redirectTo: DEFAULT_ROUTE }
    ],
    canActivate: [UserGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
