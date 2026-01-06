import { colors } from "../utils/colors.js";
import { colorizeTexts } from "./colorizeTexts.js";
export const parseFlags = (array) => {
    let options = {
        depth: 1,
        ignore: ["src", ".gitignore", "package.json"],
        force: false,
    };
    const flags = array.slice(2);
    if (array.length <= 2)
        return options;
    else if (flags[0] === "--help") {
        console.log(colorizeTexts(colors.green, "--force:"), 'This flag forces the program to skip the node_modules removal review stage');
        console.log(colorizeTexts(colors.green, "--depth=<num>:"), "This flags defines the search range of the code. The bigger the value, the depper the search. The value should be an integre and bigger than 0");
        return false;
    }
    for (let i = 0; i <= flags.length - 1; i++) {
        const flag = flags[i];
        switch (true) {
            case flag === "--force":
                options.force = true;
                break;
            case typeof flag === "string" && flag.startsWith("--depth="):
                const val = Number(flag.split("=")[1]);
                if (!Number.isInteger(val) || val === 0)
                    throw new Error("--depth value should be a integre and bigger than 0");
                else {
                    options.depth = Number(val);
                }
        }
    }
    return options;
};
