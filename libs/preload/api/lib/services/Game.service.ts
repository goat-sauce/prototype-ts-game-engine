import { Engine } from '@preload/core'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'
import { Launch } from 'preload/api/types'
import { GameScene } from '@preload/game'

export class GameService extends Service {
    public launch = async (): Promise<Launch> => {
        try {
            await Engine.setup()
            Engine.scene = new GameScene()
            Engine.scene.load()
            Engine.scene.start()

            return {
                keyboard: Engine.keyboard,
                resize: Engine.resize
            }
        } catch (error) {
            throw Errors.Crash
        }
    }
}
