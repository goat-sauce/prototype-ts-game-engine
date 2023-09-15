import { config } from '@shared/config'
import { Debug } from '@shared/debug'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'
import { Packer } from 'preload/core'

export class TilemapService extends Service {
    public async get(): Promise<Record<string, Packer.TilemapJSON>> {
        try {
            return JSON.parse(await readFile(join(__dirname, config.dir.assets, 'tilemaps.json'), 'utf-8'))
        } catch (error) {
            Debug.logger.error(Errors.FailedTilemapService, error)
            return {}
        }
    }
}
