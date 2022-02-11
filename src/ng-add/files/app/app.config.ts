import { InjectionToken } from '@angular/core';
import { DEFAULT_ROUTE } from '@globalUtils/constants';
import { getBaseUrl, GetRedirectUri } from './app.env';

export interface App_Config {
  keysToSave: string[];
  defaultRoute: string;
  baseUrl: string;
  linksToCache: string[];
  msal: Msal_config;
}
export interface Msal_config {
  clientId: string;
  tenantId: string;
  scopes: string[];
  redirectUri: string;
}

const clientId = '<%= clientId %>';
const tenantId = '<%= tenantId %>';

function getConfig(): App_Config {
  return {
    keysToSave: ['survi', 'URL_HISTORY', 'theme'],
    defaultRoute: `/home/${DEFAULT_ROUTE}`,
    baseUrl: getBaseUrl(),
    linksToCache: ['GetPhotoByIdBin'],
    msal: {
      clientId,
      tenantId,
      scopes: [`api://${clientId}/Employees.Read.All`],
      redirectUri: GetRedirectUri()
    }
  };
}

export const APP_CONFIG = new InjectionToken<App_Config>('API_ENDPOINT_GLOBAL_CONFIG', {
  providedIn: 'root',
  factory: getConfig
});
