import { Client } from '@package/core'
import { Floor, GameOverlay, Villager } from '@package/tasks'
import { contextBridge, ipcRenderer } from 'electron'
import { config } from '@package/config'
import { Chunk } from '../main/classes/Chunk'

config.renderer()

contextBridge.exposeInMainWorld('client', {
    launch: async () => {
        await Client.Engine.setup()
        Client.Engine.runner.work([new Floor(), new Villager(), new GameOverlay()])
        Client.Engine.ticker.add(() => Client.Engine.update())
        Client.Engine.ticker.start()
        const test: Chunk[] = await ipcRenderer.invoke('test', { test: true })
    },
    test: async () => {
        const test = await ipcRenderer.invoke('test', { test: true })
        console.log(test, 'test')
    }
})
