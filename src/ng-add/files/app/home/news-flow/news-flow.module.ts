import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsFlowRoutingModule } from './news-flow-routing.module';
import { ConstructionModule } from '@components/construction/construction.module';
import { NewsFlowComponent } from './news-flow.component';

@NgModule({
  declarations: [NewsFlowComponent],
  imports: [CommonModule, NewsFlowRoutingModule, ConstructionModule]
})
export class NewsFlowModule {}
