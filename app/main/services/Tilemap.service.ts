import { config } from '@package/config'
import { Debug } from '@package/debug'
import { TilemapJSON } from 'core/types'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Service } from './abstract/Service'

export class TilemapService extends Service {
    public async get(): Promise<Record<string, TilemapJSON>> {
        try {
            return JSON.parse(await readFile(join(__dirname, config.dir.assets, 'tilemaps.json'), 'utf-8'))
        } catch (error) {
            Debug.logger.error(error)
            return {}
        }
    }
}
