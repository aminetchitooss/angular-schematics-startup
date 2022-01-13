# Angular Custom template

[![npm](https://img.shields.io/npm/v/@tchitos/angular-generate.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/@tchitos/angular-generate)
[![npm](https://img.shields.io/npm/dm/@tchitos/angular-generate.svg)](https://www.npmjs.com/package/@tchitos/angular-generate)

A schematic that creates a full custom project with preconfigured :

- **Azure msal login workflow**,
- **Pwa with cache invalidation**
- **Material custom palette**
- **Picture with Auth module**
- **Svg Module**
- **Api integration with `Interceptor service`**
- **Cache mechanism as `memo-decorator`**

## Installation

1. Create a new project

```sh
ng new myApp
cd myApp

# !! Make sure in the package.json to set "rxjs": "~6.6.7"
```

2. Include Angular Azure Msal into your application.

```sh
ng add @tchitos/angular-generate

# The terminal will prompt and ask you to fill `clientId` and `tenantId`.
```

3. Run the application et voila!

```sh
ng serve
```

## Test the schematics locally

1. Clone this repository.

```sh
git clone https://github.com/aminetchitooss/angular-schematics-startup.git
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
