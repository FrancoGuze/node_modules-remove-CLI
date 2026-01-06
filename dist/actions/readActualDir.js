import fs from "node:fs/promises";
import path from "node:path";
export const readActualDir = async (targetPath, options, results = []) => {
    // console.log(options)
    if (options.depth <= 0)
        return;
    const entries = await fs.readdir(targetPath, {
        withFileTypes: true,
    });
    for (const entry of entries) {
        if (options.ignore?.includes(entry.name))
            continue;
        if (!entry.isDirectory())
            continue;
        if (entry.name === "node_modules") {
            results.push(path.join(targetPath, entry.name));
            continue;
        }
        const nextpath = path.join(targetPath, entry.name);
        await readActualDir(nextpath, {
            depth: options.depth - 1,
            ignore: options.ignore,
        }, results);
    }
    //   console.log("results: ", results);
    return results;
};
