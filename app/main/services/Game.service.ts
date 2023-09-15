import { Debug } from '@package/debug'
import { Service } from './abstract/Service'
import { Load, Save } from '../types'

export class GameService extends Service {
    public static Errors = {
        FailedToSave: 'Failed to save.'
    }

    public async create(): Promise<Load> {
        try {
            const save = await GameService.save()
            if (save.success) return { success: true }
            throw GameService.Errors.FailedToSave
        } catch (error) {
            Debug.logger.error(error)
            return { success: false }
        }
    }

    public static async save(): Promise<Save> {
        return {
            success: true
        }
        // try {
        //     await FileHelper.mkdir(config.dir.data);
        //     await writeFile('world.json', JSON.stringify({}))

        //     return {
        //         success: true
        //     }
        // } catch (error) {
        //     Debug.logger.error(error)

        //     return {
        //         success: false
        //     }
        // }
    }
}
