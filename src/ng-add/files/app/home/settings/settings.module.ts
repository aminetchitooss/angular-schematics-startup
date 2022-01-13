import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ConstructionModule } from '@components/construction/construction.module';
@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, ConstructionModule]
})
export class SettingsModule {}
