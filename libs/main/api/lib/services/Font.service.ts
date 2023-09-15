import { config } from '@shared/config'
import { Debug } from '@shared/debug'
import { FileHelper } from '@shared/helpers'
import { join } from 'path'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'

export class FontService extends Service {
    public async get(): Promise<string[]> {
        try {
            return await FileHelper.search(join(__dirname, config.dir.assets), '.ttf', [])
        } catch (error) {
            Debug.logger.error(Errors.FailedFontService, error)
            return []
        }
    }
}
