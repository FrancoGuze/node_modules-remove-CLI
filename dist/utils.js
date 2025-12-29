import { stdin, stdout } from "process";
import { createInterface } from "readline/promises";
export const askUser = async (msg) => {
    const rl = createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(`${msg} (y/n)`);
    rl.close();
    console.log("Answer value: ", answer);
};
