import { OptionsInterface } from "./interface";

export function filterReservedKeywords(selector: string): boolean {
  // Documented here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Reserved_keywords_as_of_ECMAScript_2015
  const reservedWords = [
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield"
  ];
  return reservedWords.includes(selector);
}

/**
 * Builds the banner at the beginning of each .d.ts file.
 * By default returns:
 *
 * `This is an auto generated file.
 * Please do not edit.`
 *
 * The user can pass it own message or set as `false` to hide the banner
 * @param options string
 */
export function buildbanner(options?: OptionsInterface): string {
  let banner = `// This is an auto generated file. \n// Please do not edit. \n\n`;
  if (options) {
    if (options.banner === false) {
      banner = "";
    } else {
      banner = `// ${options.banner} \n\n`;
    }
  }
  return banner;
}

/**
 *
 * @param moduleExports
 * @param filename
 */
export function buildTsExports(moduleExports, filename: string): string {
  let cssModuleDefinition = "";
  Object.keys(moduleExports.locals).map(key => {
    if (!filterReservedKeywords(key)) {
      cssModuleDefinition += `export const ${key}: string; \n`;
    }
  });
  return cssModuleDefinition;
}
