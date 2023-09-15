import { Client } from '@package/core'
import { Floor, Villager } from '@package/actions'
import { contextBridge } from 'electron'
import { config } from '@package/config'

contextBridge.exposeInMainWorld('client', {
  launch: async () => {
    config.renderer()
    await Client.setup()
    Client.stagehand.work([new Floor(), new Villager()])
    Client.ticker.add(() => Client.state())
    Client.ticker.start()
  },
})
