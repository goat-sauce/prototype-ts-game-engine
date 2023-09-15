import { Debug } from '@package/debug'
import { searchDir } from '@package/utils'
import { join } from 'path'
import { Service } from './abstract/Service'

export class AtlasService extends Service {
    public async get() {
        try {
            const root = join(__dirname, 'assets')
            return await searchDir(root, 'atlas.json', [])
        } catch (error) {
            Debug.Logger.error(error)
        }
    }
}