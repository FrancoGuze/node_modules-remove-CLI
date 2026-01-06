#!/usr/bin/env node
type optionsType = {
  depth: number;
  force: boolean;
  ignore: string[];
};
import fs, { read } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { askUser } from "./prompts/askuser.js";
import { removeModules } from "./actions/removeModules.js";
import { readActualDir } from "./actions/readActualDir.js";
import { parseFlags } from "./actions/parseFlags.js";
import { colorizeTexts } from "./actions/colorizeTexts.js";
import { colors } from "./utils/colors.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const processCli = process.cwd();
const w = process.stdout.columns;
const border = Array(w).fill("-").join("");
const title = "node_modules removal program";
const marginVal = (w - title.length) / 2;
const margin = Array(Math.floor(marginVal)).fill(" ").join("");

console.log(
  colorizeTexts(colors.dim, `\n${border}\n`),
  margin,
  colorizeTexts(colors.bold, title),
  colorizeTexts(colors.dim, `\n${border}\n`)
);
const options = parseFlags(process.argv);
if (options !== false) {
  // console.log("From index.ts options val: ", options);
  const nodeModules = await readActualDir(processCli, options);
  // console.log("Res nodeModules search: ", nodeModules?.length);
  if (!nodeModules || nodeModules.length == 0) {
    console.log(
      colorizeTexts(colors.red, "Error:"),
      "node-modules not found\n"
    );
  } else {
    const deleteModules = await askUser(
      `${colorizeTexts(colors.green,String(nodeModules?.length))} node_modules found. Do you want to delete them? ${
        options.force
          ? colorizeTexts(
              colors.red,
              "Since the --force flag is used, the check step will be omited"
            )
          : ""
      }`
    );
    if (!deleteModules) {
      console.log("node_modules preserved. Ending execution");
    } else {
      for (const dir of nodeModules ?? []) {
        if (options.force) await removeModules(dir);
        else {
          const proceed = await askUser(`Eliminar modulos de ${dir}?`);

          if (!proceed) {
            console.log("Omitido");
            continue;
          }

          console.log("Eliminando");
          await removeModules(dir);
        }
      }
      console.log("\nEnding execution\n");
    }
  }
}
