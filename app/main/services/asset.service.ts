import { Debug } from '@package/debug'
import { searchDir } from '@package/utils'
import { join } from 'path'
import { Service } from './abstract/Service'

export class AssetService extends Service {
    public async get() {
        try {
            const root = join(__dirname, 'assets')
            return await searchDir(root, '.png', [])
        } catch (error) {
            Debug.Logger.error(error)
        }
    }
}