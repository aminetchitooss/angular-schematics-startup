import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { ProfilComponent } from './profil/profil.component';
import { RoutesComponent } from './routes/routes.component';
import { UndersideNavComponent } from './underside-nav/underside-nav.component';
import { RouteLinkComponent } from './routes/route-link/route-link.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { FormsModule } from '@angular/forms';
import { PictureModule } from '../picture/picture.module';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { MatRippleModule } from '@angular/material/core';
import { MobileRoutesComponent } from './mobile-routes/mobile-routes.component';
import { ProfilInfoPipe } from './profil-info.pipe';

@NgModule({
  declarations: [NavigationComponent, ProfilComponent, RoutesComponent, UndersideNavComponent, RouteLinkComponent, MobileRoutesComponent, ProfilInfoPipe],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    SvgIconModule,
    PictureModule,
    RouterModule,
    MatRippleModule
  ],
  exports: [NavigationComponent, ProfilInfoPipe]
})
export class NavigationModule {}
