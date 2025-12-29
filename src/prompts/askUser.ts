import { stdin, stdout } from "process";
import { createInterface } from "readline/promises";

export const askUser = async (msg: string) => {
  const rl = createInterface({ input: stdin, output: stdout });

  const answer = await rl.question(`${msg} (y/n)`);
  rl.close();
  if (answer === "y" || answer === "Y") {
    console.log("respuesta afirmativa!");
    return true;
  }
  if (answer === "n" || answer === "N") {
    console.log("respuesta negativa...");
    return false;
  }
};
