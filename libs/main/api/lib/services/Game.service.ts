import { Debug } from '@shared/debug'
import { Load, Save } from 'main/api/types'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'

export class GameService extends Service {
    public async load(): Promise<Load> {
        try {
            const save = await GameService.save()
            if (save.success) return { success: true }
            throw Errors.FailedToSave
        } catch (error) {
            Debug.logger.error(Errors.FailedGameService, error)
            return { success: false }
        }
    }

    public static async save(): Promise<Save> {
        return {
            success: true
        }
    }
}
