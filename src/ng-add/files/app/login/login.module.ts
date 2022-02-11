import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FailedLoginComponent } from './failed-login/failed-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { SvgIconModule } from '@components/svg-icon/svg-icon.module';
import { PostAuthLoadingComponent } from './post-auth-loading/post-auth-loading.component';

@NgModule({
  declarations: [LoginComponent, FailedLoginComponent, PostAuthLoadingComponent],
  imports: [CommonModule, LoginRoutingModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatRippleModule, FormsModule, ReactiveFormsModule, SvgIconModule]
})
export class LoginModule {}
