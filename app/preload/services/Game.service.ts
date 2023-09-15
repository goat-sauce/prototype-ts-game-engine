import { renderer } from '@package/config'
import { Client } from '@package/core'
import { Vector2 } from '@package/entities'
import { Player } from '@package/tasks'
import { Launch } from '../types'
import { Service } from './abstract/Service'

export class GameService extends Service {
    public launch = async (): Promise<Launch> => {
        renderer.settings()

        await Client.Engine.setup()
        Client.Engine.runner.work([new Player({ animation: 'idle', position: new Vector2(0, 0) })])
        Client.Engine.ticker.add(() => Client.Engine.update())
        Client.Engine.ticker.start()

        return {
            keyboard: Client.Engine.keyboard,
            resize: Client.Engine.resize
        }
    }
}
