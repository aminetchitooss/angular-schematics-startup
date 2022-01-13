import { Rule, SchematicContext, Tree, chain, noop, mergeWith, apply, url, template, move } from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { updateAppModule } from "./update-module";
import { updateAppRouting } from "./update-routing";
import { updateIndex } from "./update-index";
import { updateAppHtml, updateAppTs } from "./update-app.component.files";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: MsalSchematicOption): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addPackageJsonDependency(),
    updateAppTs(options),
    updateAppHtml(options),
    updateIndex(options),
    updateAppModule(options),
    updateAppRouting(options),
    updateTsConfig(),
    updateAngularConfig(),

    mergeWith(
      apply(url("./files"), [
        template({
          clientId: options.clientId,
          tenantId: options.tenantId,
          projectName: options.projectName,
          description: options.description,
          url: options.url.split("http://").join("").split("https://").join("")
        }),
        move(options.srcDir)
      ])
    ),
    mergeWith(
      apply(url("./rootFiles"), [
        template({
          url: options.url
        })
      ])
    )
  ]);
}

// install dependency to package.json and install
function addPackageJsonDependency() {
  return (_host: Tree, _context: SchematicContext) => {
    if (_host.exists("package.json")) {
      const jsonStr = _host.read("package.json")!.toString("utf-8");
      const json = JSON.parse(jsonStr);

      const type = "dependencies";
      if (!json[type]) {
        json[type] = {};
      }

      const dependenciesToInstall = [
        { globalPkg: "rxjs", version: "~6.6.7" },
        { globalPkg: "@angular/cdk", version: "latest" },
        { globalPkg: "@angular/material", version: "latest" },
        { globalPkg: "@angular/service-worker", version: "latest" },
        { globalPkg: "memo-decorator", version: "latest" },
        { globalPkg: "@ngrx/store", version: "latest" },
        { globalPkg: "@tchitos/azure-msal", version: "latest" },
        { globalPkg: "@azure/msal-angular", version: "latest" },
        { globalPkg: "@azure/msal-browser", version: "latest" }
      ];

      for (const dep of dependenciesToInstall) {
        const { globalPkg, version } = dep;
        if (!json[type][globalPkg]) {
          json[type][globalPkg] = version;
        }
        _context.logger.log("info", `${globalPkg} was added as dependency`);
      }

      _host.overwrite("package.json", JSON.stringify(json, null, 2));

      _context.addTask(new NodePackageInstallTask());
    }
    return _host;
  };
}

function updateTsConfig() {
  return (_host: Tree, _context: SchematicContext) => {
    const fileName = "tsconfig.json";
    if (_host.exists(fileName)) {
      const jsonStr = _host.read(fileName)!.toString("utf-8");
      const json = JSON.parse(jsonStr);

      const type = "compilerOptions";
      if (!json[type]) {
        json[type] = {};
      }

      const configsToAdd = [
        { key: "resolveJsonModule", value: true },
        { key: "esModuleInterop", value: true },
        {
          key: "paths",
          value: {
            "@api/*": ["src/app/shared/api/*"],
            "@components/*": ["src/app/shared/components/*"],
            "@globalUtils/*": ["src/app/shared/global-utils/*"],
            "@guards/*": ["src/app/shared/guards/*"],
            "@interfaces/*": ["src/app/shared/interfaces/*"],
            "@services/*": ["src/app/shared/services/*"],
            "@store/*": ["src/app/shared/store/*"]
          }
        }
      ];

      for (const dep of configsToAdd) {
        const { key, value } = dep;
        json[type][key] = value;
        _context.logger.log("info", `${key} was added in tsconfig.json`);
      }

      _host.overwrite(fileName, JSON.stringify(json, null, 2));
    }

    return _host;
  };
}

function updateAngularConfig() {
  return (_host: Tree, _context: SchematicContext) => {
    const fileName = "angular.json";
    if (_host.exists(fileName)) {
      const jsonStr = _host.read(fileName)!.toString("utf-8");
      const json = JSON.parse(jsonStr);

      const type = "projects";
      if (!json[type]) {
        return _host;
      }
      const projectName = Object.keys(json[type])[0];
      if (!projectName) return _host;

      json[type][projectName]["prefix"] = "";
      const schematicsOld = json[type][projectName]["schematics"];

      if (!schematicsOld) {
        schematicsOld["@schematics/angular:component"]["changeDetection"] = "OnPush";
        schematicsOld["@schematics/angular:component"]["skipTests"] = true;
        json[type][projectName]["schematics"] = {
          ...schematicsOld,
          "@schematics/angular:application": {
            strict: true
          },
          "@schematics/angular:class": {
            skipTests: true
          },
          "@schematics/angular:guard": {
            skipTests: true
          },
          "@schematics/angular:directive": {
            skipTests: true
          },
          "@schematics/angular:pipe": {
            skipTests: true
          },
          "@schematics/angular:service": {
            skipTests: true
          }
        };
      }

      if (json[type][projectName]?.["architect"]?.["build"]?.["options"]) {
        json[type][projectName]["architect"]["build"]["options"]["outputPath"] = "dist";

        json[type][projectName]["architect"]["build"]["options"]["assets"] = ["src/favicon.ico", "src/assets", "src/manifest.webmanifest", "src/web.config"];
        json[type][projectName]["architect"]["build"]["options"]["styles"] = ["src/styles/styles.scss"];

        json[type][projectName]["architect"]["build"]["options"]["serviceWorker"] = true;

        json[type][projectName]["architect"]["build"]["options"]["ngswConfigPath"] = "ngsw-config.json";
      }

      _host.overwrite(fileName, JSON.stringify(json, null, 2));
    }

    return _host;
  };
}

export interface MsalSchematicOption {
  srcDir: string;
  appDir: string;
  clientId: string;
  tenantId: string;
  projectName: string;
  description: string;
  url: string;
  [key: string]: any;
}
