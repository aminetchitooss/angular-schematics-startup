import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { MsalSchematicOption } from ".";

export function updateFile(_host: Tree, _context: SchematicContext, fileName: string, newUpdatedRoute: string, options: MsalSchematicOption, bypassPath: string = ""): Tree {
  const path = bypassPath || options.appDir + fileName;
  if (_host.exists(path)) {
    _host.overwrite(path, newUpdatedRoute);
  } else {
    _context.logger.log("error", "Missing File with path => " + path);
  }
  return _host;
}
