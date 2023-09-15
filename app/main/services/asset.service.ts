import { config } from '@package/config'
import { Debug } from '@package/debug'
import { FileHelper } from '@package/helpers'
import { join } from 'path'
import { Service } from './abstract/Service'

export class AssetService extends Service {
    public async get(): Promise<string[]> {
        try {
            return await FileHelper.search(join(__dirname, config.dir.assets), '.png', [])
        } catch (error) {
            Debug.logger.error(error)
            return []
        }
    }
}
