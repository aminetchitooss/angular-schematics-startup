import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsBacklogComponent } from './news-backlog.component';

const routes: Routes = [
  { path: '', component: NewsBacklogComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsBacklogRoutingModule {}
