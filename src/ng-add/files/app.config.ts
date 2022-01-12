import { InjectionToken } from '@angular/core';
import { DEFAULT_ROUTE } from './shared/global-utils/constants';

export interface App_Config {
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
    defaultRoute: DEFAULT_ROUTE,
    baseUrl: getBaseUrl(),
    linksToCache: ['GetPhotoByIdBin'],
    msal: {
      clientId,
      tenantId,
      scopes: ['api://' + clientId + '/Employees.Read.All'],
      redirectUri: window.location.origin
    }
  };
}

function getBaseUrl(): string {
  return 'API_URL';
}

export const APP_CONFIG = new InjectionToken<App_Config>('API_ENDPOINT_GLOBAL_CONFIG', {
  providedIn: 'root',
  factory: getConfig
});
