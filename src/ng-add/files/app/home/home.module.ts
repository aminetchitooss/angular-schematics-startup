import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NavigationModule } from '@components/navigation/navigation.module';
import { ErrorUserModule } from '@components/error-user/error-user.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, LayoutModule, FormsModule, NavigationModule, MatProgressSpinnerModule, ErrorUserModule]
})
export class HomeModule {}
