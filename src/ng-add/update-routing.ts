import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { MsalSchematicOption } from ".";
import { updateFile } from "./update-file";

const updatdContent = `import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard, MsalGuard], data: { preload: false } },

  {
    path: 'error',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    data: { preload: false }
  },
  {
    path: 'code',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    data: { preload: false }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    data: { preload: false }
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // Don't perform initial navigation in iframes or popups
      initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabled' : 'disabled' // Remove this line to use Angular Universal
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

`;

export function updateAppRouting(options: MsalSchematicOption) {
  return (_host: Tree, _context: SchematicContext) => {
    return updateFile(_host, _context, "app-routing.module.ts", updatdContent, options);
  };
}
