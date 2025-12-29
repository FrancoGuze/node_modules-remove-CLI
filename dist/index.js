#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { askUser } from "./prompts/askuser.js";
import { removeModules } from "./actions/removeModules.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log({ base: import.meta.url, __filename, __dirname });
const processCli = process.cwd();
// console.log("Ubicacion de ejecucion: ",processCli)
const command = process.argv.slice(2)[0];
// console.log({command})
if (!command) {
    console.log("Uso basico: cli <command>");
}
else {
    if (command === "clean") {
        console.log("Comando clean detectado, revisando direccion actual");
        fs.readdir(processCli, async (err, files) => {
            if (err) {
                console.log("Error detectado: ", err);
                return;
            }
            console.log("Files: ", files);
            if (files.includes("node_modules")) {
                console.log("\nHay node modules!\n");
                // fs.rm()
                const proceed = await askUser("Quieres eliminar node_modules?");
                if (!proceed) {
                    console.log("Cancelando borrado...");
                    return;
                }
                if (proceed) {
                    console.log("Eliminando node_modules");
                    console.log(processCli);
                    removeModules(processCli);
                }
            }
            else {
                console.log("No se encontro node_modules");
                return;
            }
        });
    }
    else {
        console.log("Comando desconocido: ", command);
    }
}
