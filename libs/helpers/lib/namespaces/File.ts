import { Debug } from '@package/debug'
import { existsSync } from 'fs'
import { lstat, readdir } from 'fs/promises'
import { join } from 'path'

export namespace FileHelper {
    export async function mkdir(path: string): Promise<void> {
        try {
            const dirs = path.split('/')
            let route = ''

            for (const dir of dirs) {
                route = join(path, dir)
                const exists = existsSync(route)
                if (!exists) await mkdir(route)
            }
        } catch (error) {
            Debug.logger.info(error)
        }
    }

    export async function search(root: string, search: string, array: string[]): Promise<string[]> {
        try {
            const dir = await readdir(root)

            for (const file of dir) {
                const path = join(root, file)
                const stat = await lstat(path)

                if (stat.isDirectory()) {
                    await FileHelper.search(path, search, array)
                } else {
                    if (file.includes(search)) {
                        array.push(path)
                    }
                }
            }

            return array
        } catch (error) {
            Debug.logger.error(error)
            return []
        }
    }
}
