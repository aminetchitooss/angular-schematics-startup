import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsBacklogRoutingModule } from './news-backlog-routing.module';
import { ConstructionModule } from '@components/construction/construction.module';
import { NewsBacklogComponent } from './news-backlog.component';

@NgModule({
  declarations: [NewsBacklogComponent],
  imports: [CommonModule, NewsBacklogRoutingModule, ConstructionModule]
})
export class NewsBacklogModule {}
