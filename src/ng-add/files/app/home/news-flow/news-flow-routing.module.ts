import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFlowComponent } from './news-flow.component';

const routes: Routes = [
  { path: '', component: NewsFlowComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsFlowRoutingModule {}
