import { Engine } from '@preload/core'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'
import { DebugScene } from '@preload/tasks'
import { Launch } from 'preload/api/types'

export class GameService extends Service {
    public launch = async (): Promise<Launch> => {
        try {
            await Engine.setup()
            new DebugScene().load()

            return {
                keyboard: Engine.keyboard,
                resize: Engine.resize
            }
        } catch (error) {
            throw Errors.Crash
        }
    }
}
