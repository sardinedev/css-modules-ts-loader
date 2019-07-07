import fs from "fs";
import { getOptions } from "loader-utils";
import { buildbanner, buildTsExports } from "./helpers";
import { OptionsInterface } from "./interface";

export default function typingsLoader(
  content: string | Buffer,
  _map: string | Buffer,
  _meta: string | Buffer
): string | Buffer | void | undefined {
  // TODO: Check if css-loader has option 'module', exit if not.

  const filename = `${this.resourcePath}.d.ts`;
  const moduleExports = this.exec(content, this.resourcePath);
  const options: OptionsInterface = getOptions(this);

  let cssModuleDefinition = "";

  if (moduleExports.locals) {
    const banner = buildbanner(options);

    cssModuleDefinition = banner;
    cssModuleDefinition += buildTsExports(moduleExports, filename);

    // TODO: Set the correct EOF for the OS
    fs.writeFileSync(filename, cssModuleDefinition, { encoding: "utf8" });
  }

  return content;
}

// TODO: emit warning if there's a reserved keyword
// const warning = new Error(
//   `Hey, CSS-Modules Typings here! Just to let you know I removed '${key}' from '${filename}' because it's a reserved Javascript keyword.`
// );
// this.emitWarning(warning);
