import path from "path"
import fs from "node:fs/promises"
export const removeModules = async (pathName:string) => {
      const rmexe = await fs.rm(pathName,{recursive:true,maxRetries:2})
      rmexe === undefined && console.log(`node_modules from ${pathName} removed`)
}