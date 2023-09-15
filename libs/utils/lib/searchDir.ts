import { Debug } from "@package/debug"
import { lstat, readdir } from "fs/promises"
import { join } from "path"

export async function searchDir(root: string, search: string, array: string[]) {
    try {
        const dir = await readdir(root)

        for (const file of dir) {
            const path = join(root, file)
            const stat = await lstat(path)

            if (stat.isDirectory()) {
                await searchDir(path, search, array)
            } else {
                if (file.includes(search)) {
                    array.push(path)
                }
            }
        }

        return array
    } catch (error) {
        Debug.Logger.error(error)
    }
}