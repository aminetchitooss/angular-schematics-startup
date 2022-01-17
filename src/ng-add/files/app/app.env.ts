import * as data from '../assets/app.settings.json';

const appSettings = data;
export const projectVersion = appSettings.version;

type environement = 'PRD' | 'PPR' | 'TST' | 'DEV';

export const CURRENT_ENV: environement = appSettings.environment as environement;

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

const URL_API_DEV = '<%= apiUrl %>/tst';
const URL_API_TEST = '<%= apiUrl %>/tst';
const URL_API_PPR = '<%= apiUrl %>/ppr';
const URL_API_PROD = '<%= apiUrl %>';

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

