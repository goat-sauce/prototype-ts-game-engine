import { config } from '@shared/config'
import { Debug } from '@shared/debug'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { TilemapJSON } from 'preload/core/types'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'

export class TilemapService extends Service {
    public async get(): Promise<Record<string, TilemapJSON>> {
        try {
            return JSON.parse(await readFile(join(__dirname, config.dir.assets, 'tilemaps.json'), 'utf-8'))
        } catch (error) {
            Debug.logger.error(Errors.FailedTilemapService, error)
            return {}
        }
    }
}
