import { config } from '@package/config'
import { Debug } from '@package/debug'
import { FileHelper } from '@package/helpers'
import { AtlasJSON } from 'core/types'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Service } from './abstract/Service'

export class AtlasService extends Service {
    public async get(): Promise<Record<string, AtlasJSON>> {
        try {
            const paths = await FileHelper.search(join(__dirname, config.dir.assets), 'atlas.json', [])
            const atlases: Record<string, AtlasJSON> = {}

            for (const path of paths) {
                const file = await readFile(path, 'utf-8')
                const json: AtlasJSON = JSON.parse(file)
                atlases[json.meta.key] = json
            }

            return atlases
        } catch (error) {
            Debug.logger.error(error)
            return {}
        }
    }
}
