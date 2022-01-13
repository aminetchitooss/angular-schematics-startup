import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DEFAULT_ROUTE, ROUTING_BACKGLOG, ROUTING_FLOW, ROUTING_SETTING } from '@globalUtils/constants';
import { UserGuard } from '@guards/user.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: ROUTING_BACKGLOG, loadChildren: () => import('./news-backlog/news-backlog.module').then((m) => m.NewsBacklogModule), data: { preload: false } },
      { path: ROUTING_FLOW, loadChildren: () => import('./news-flow/news-flow.module').then((m) => m.NewsFlowModule), data: { preload: false } },
      { path: ROUTING_SETTING, loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), data: { preload: false } },
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
