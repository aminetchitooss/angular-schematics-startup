# Angular Azure Msal

[![npm](https://img.shields.io/npm/v/@tchitos/azure-msal.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/@tchitos/azure-msal)
[![npm](https://img.shields.io/npm/dm/@tchitos/azure-msal.svg)](https://www.npmjs.com/package/@tchitos/azure-msal)

Angular MSAL Azure - This package supports Angular 13+

## Installation

1. Create a new project

```sh
ng new test
cd test

# !! Make sure in the package.json to set "rxjs": "~6.6.0"
```

2. Include Angular Azure Msal into your application.

```sh
ng add @tchitos/azure-msal

# The terminal will prompt and ask you to fill `clientId` and `tenantId`.
```

3. Run the application et voila!

```sh
ng serve
```

## Test the schematics locally

1. Clone this repository.

```sh
git clone https://github.com/aminetchitooss/angular-azure-msal.git
```

2. Install dependencies

```sh
npm install
```

3. Make changes and then run

```bash
npm run build
schematics .:ng-add --dry-run=false
```

## License

MIT
