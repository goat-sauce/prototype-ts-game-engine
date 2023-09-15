import { Engine } from '@preload/core'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'
import { Launch } from 'preload/api/types'
// import { TestScene } from 'preload/game/lib/scenes/Test.scene'
import { DebugScene } from '@preload/game'

export class GameService extends Service {
    public launch = async (): Promise<Launch> => {
        try {
            await Engine.setup()
            const scene = new DebugScene()

            scene.load(scene.gameObjects.player)

            return {
                keyboard: Engine.keyboard,
                resize: Engine.resize
            }
        } catch (error) {
            throw Errors.Crash
        }
    }
}
