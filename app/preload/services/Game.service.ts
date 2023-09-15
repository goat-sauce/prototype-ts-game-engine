import { renderer } from '@package/config'
import { Client } from '@package/core'
import { Vector2 } from '@package/helpers'
import { House, Npc, Player } from '@package/tasks'
import { Launch } from '../types'
import { Service } from './abstract/Service'

export class GameService extends Service {
    public launch = async (): Promise<Launch> => {
        renderer.settings()
        await Client.Engine.setup()

        const player = new Player({ animation: 'idle', position: new Vector2(0, 0) });
        const npc = new Npc({ animation: 'idle', position: new Vector2(0, 1) })
        const house = new House({})

        Client.Engine.stage.target = player
        Client.Engine.runner.setup([house, npc, player])
        Client.Engine.ticker.add(() => Client.Engine.update())
        Client.Engine.ticker.start()

        return {
            keyboard: Client.Engine.keyboard,
            resize: Client.Engine.resize
        }
    }
}
