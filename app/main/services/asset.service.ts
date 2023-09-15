import { Debug } from "@package/debug";
import { lstat, readdir } from "fs/promises";
import { join } from "path";
import { Service } from "./abstract/Service";

export class AssetService extends Service {
    public static path(asset: string, absoluteFrom: string) {
        const dirs = absoluteFrom.split('\\')
        const assets = dirs.indexOf('assets')
        const to = dirs.slice(assets, dirs.length - 1).join('/')
        return `${to}/${asset}`
    }

    public static async search(root: string, search: string, array: { path: string; atlas: string; file: string }[]) {
        try {
            const dir = await readdir(root)

            for (const file of dir) {
                const path = join(root, file)
                const stat = await lstat(path)

                if (stat.isDirectory()) {
                    await AssetService.search(path, search, array)
                } else {
                    if (file.includes(search)) {
                        array.push({ path: AssetService.path(file, path), atlas: AssetService.path('atlas.json', path), file })
                    }
                }
            }

            return array
        } catch (error) {
            Debug.Logger.error(error)
        }
    }
}