import { buildbanner, buildTsExports, filterReservedKeywords } from "./helpers";
import { OptionsInterface } from "./interface";

test("if string is reserved keyword returns true", () => {
  expect(filterReservedKeywords("class")).toBe(true);
});

test("if string is not a reserved keyword returns false", () => {
  expect(filterReservedKeywords(".class")).toBe(false);
});

test("if no options are set returns default banner message", () => {
  expect(buildbanner()).toBe(
    `// This is an auto generated file. \n// Please do not edit. \n\n`
  );
});

test("if user sets `banner` to `false` it should return an empty string", () => {
  const options: OptionsInterface = { banner: false };
  expect(buildbanner(options)).toBe("");
});

test("if user sets a banner message it should return it with the proper format", () => {
  const options: OptionsInterface = { banner: "I am a banner" };
  const expectedResult = `// I am a banner \n\n`;
  expect(buildbanner(options)).toBe(expectedResult);
});

test("creates the correct Typescript syntax to export css types", () => {
  const modulesExports = {
    locals: {
      one: "U7SA09FPgzfL0wxaMCyLF",
      two: "_2e43ghnXX24M2ZFgLzgCyc"
    }
  };
  const expected = `export const one: string; \nexport const two: string; \n`;
  expect(buildTsExports(modulesExports, "style.scss")).toBe(expected);
});

test("creates the correct Typescript syntax to export css types and ignore reserved keywords", () => {
  const modulesExports = {
    locals: {
      class: "U7SA09FPgzfL0wxaMCyLF",
      two: "_2e43ghnXX24M2ZFgLzgCyc"
    }
  };
  const expected = `export const two: string; \n`;
  expect(buildTsExports(modulesExports, "style.scss")).toBe(expected);
});

test("returns empty string if `locals` object is empty", () => {
  const modulesExports = {
    locals: {}
  };
  const expected = ``;
  expect(buildTsExports(modulesExports, "style.scss")).toBe(expected);
});
