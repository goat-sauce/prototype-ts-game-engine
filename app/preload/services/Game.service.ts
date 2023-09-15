import { renderer } from '@package/config'
import { Client } from '@package/core'
import { DebugScene } from 'tasks/lib/scenes/Debug.scene'
import { Launch } from '../types'
import { Service } from './abstract/Service'

export class GameService extends Service {
    public launch = async (): Promise<Launch> => {
        renderer.settings()
        await Client.Engine.setup()

        const scene = new DebugScene()

        Client.Engine.stage.center(scene.tasks.player.position)
        Client.Engine.stage.target = scene.tasks.player
        Client.Engine.runner.setup([...Object.values(scene.tasks)])
        Client.Engine.ticker.add(() => Client.Engine.update())
        Client.Engine.ticker.start()

        setTimeout(() => {
            scene.destroy()
        }, 2000)

        return {
            keyboard: Client.Engine.keyboard,
            resize: Client.Engine.resize
        }
    }
}
