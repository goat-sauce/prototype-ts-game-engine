import { Client } from '@package/core'
import { contextBridge } from 'electron'
import { renderer } from '@package/config'
import { Player } from 'tasks/lib/Player'
import { Vector2 } from '@package/entities'

contextBridge.exposeInMainWorld('client', {
    launch: async () => {
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
})
