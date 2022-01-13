import * as data from '../assets/app.settings.json';

const appSettings = data;
export const projectVersion = appSettings.version;

type environement = 'PRD' | 'PPR' | 'TST' | 'DEV';

const CURRENT_ENV: environement = appSettings.environment as environement;

export function GetRedirectUri(): string {
  const starter = window.location.origin;
  switch (CURRENT_ENV) {
    case 'DEV':
      return starter + '';
    case 'TST':
      return starter + '/tst';
    case 'PPR':
      return starter + '/ppr';
    case 'PRD':
      return starter + '';
  }
}

const URL_API_DEV = 'https://digitalfactory-api.servier.com/onsite/tst';
const URL_API_TEST = 'https://digitalfactory-api.servier.com/onsite/tst';
const URL_API_PPR = 'https://digitalfactory-api.servier.com/onsite/ppr';
const URL_API_PROD = 'https://digitalfactory-api.servier.com/onsite';

export function getBaseUrl(): string {
  switch (CURRENT_ENV) {
    case 'DEV':
      return URL_API_DEV;
    case 'TST':
      return URL_API_TEST;
    case 'PPR':
      return URL_API_PPR;
    case 'PRD':
      return URL_API_PROD;
  }
}

const tenantId = 'cc0a4ff6-9454-4e4b-881b-85f448dee2e3';
const clientId = 'f444ccf2-d655-421a-a619-718b541c8d2b';
