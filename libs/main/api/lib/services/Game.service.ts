import { Debug } from '@shared/debug'
import { Load, Save } from '../types'
import { Service } from './abstract/Service'

export class GameService extends Service {
    public static Errors = {
        FailedToSave: 'Failed to save.'
    }

    public async load(): Promise<Load> {
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
    }
}
