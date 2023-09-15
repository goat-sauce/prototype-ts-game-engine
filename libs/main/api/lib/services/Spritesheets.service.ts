import { config } from '@shared/config'
import { Debug } from '@shared/debug'
import { FileHelper } from '@shared/helpers'
import { join } from 'path'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'

export class SpritesheetsService extends Service {
    public async get(): Promise<string[]> {
        try {
            console.log('service', await FileHelper.search(join(__dirname, config.dir.assets), '.png', []))
            return await FileHelper.search(join(__dirname, config.dir.assets), '.png', [])
        } catch (error) {
            Debug.logger.error(Errors.FailedSpritesheetService, error)
            return []
        }
    }
}
