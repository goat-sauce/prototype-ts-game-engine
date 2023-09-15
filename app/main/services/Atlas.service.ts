import { AtlasJSON } from '@package/atlas'
import { Debug } from '@package/debug'
import { searchDir } from '@package/utils'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Service } from './abstract/Service'

export class AtlasService extends Service {
    public async get() {
        try {
            const root = join(__dirname, 'out')
            const paths = await searchDir(root, 'atlas.json', [])
            const atlases: Record<string, AtlasJSON> = {}

            for (const path of paths) {
                const file = await readFile(path, 'utf-8')
                const json: AtlasJSON = JSON.parse(file)
                atlases[json.meta.key] = json;
            }

            return atlases
        } catch (error) {
            Debug.Logger.error(error)
        }
    }
}