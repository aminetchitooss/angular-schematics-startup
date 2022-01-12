import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { MsalSchematicOption } from ".";
import { updateFile } from "./update-file";

const updatedContent = `import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MsalInterceptor,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalRedirectComponent,
  MsalGuard
} from "@azure/msal-angular";
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_CONFIG, App_Config } from "./app.config";

export function MSALInstanceFactory(configService: App_Config): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: configService.msal.clientId,
      authority: "https://login.microsoftonline.com/" + configService.msal.tenantId,
      redirectUri: configService.msal.redirectUri,
      postLogoutRedirectUri: configService.msal.redirectUri,
      navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
    }
  });
}

export function MSALGuardConfigFactory(configService: App_Config): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: configService.msal.scopes
    }
  };
}

export function MSALInterceptorConfigFactory(configService: App_Config): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set("https://graph.microsoft.com/v1.0/me", ["user.read"]);
  protectedResourceMap.set(configService.baseUrl, configService.msal.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MsalModule, BrowserAnimationsModule, HttpClientModule],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
      deps: [APP_CONFIG]
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },

    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
      deps: [APP_CONFIG]
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
      deps: [APP_CONFIG]
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {}

`;

export function updateAppModule(options: MsalSchematicOption) {
  return (_host: Tree, _context: SchematicContext) => {
    return updateFile(_host, _context, "app.module.ts", updatedContent, options);
  };
}
