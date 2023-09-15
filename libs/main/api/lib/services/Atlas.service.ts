import { config } from '@shared/config'
import { Debug } from '@shared/debug'
import { FileHelper } from '@shared/helpers'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'
import { Packer } from '@preload/core'

export class AtlasService extends Service {
    public async get(): Promise<Record<string, Packer.AtlasJSON>> {
        try {
            const paths = await FileHelper.search(join(__dirname, config.dir.assets), 'atlas.json', [])
            const atlases: Record<string, Packer.AtlasJSON> = {}

            for (const path of paths) {
                const file = await readFile(path, 'utf-8')
                const json: Packer.AtlasJSON = JSON.parse(file)
                atlases[json.meta.key] = json
            }

            return atlases
        } catch (error) {
            Debug.logger.error(Errors.FailedAtlasService, error)
            return {}
        }
    }
}
