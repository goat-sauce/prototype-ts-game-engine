import { API } from '@main/api'
import { Channels } from '@shared/channels'
import { Debug } from '@shared/debug'
import { app, ipcMain } from 'electron'

async function start(): Promise<void> {
    try {
        const api = new API()
        await app.whenReady()
        api.window.create()
        ipcMain.handle(Channels.game.load, api.game.load)
        ipcMain.handle(Channels.spritesheets.get, api.spritesheets.get)
        ipcMain.handle(Channels.atlas.get, api.atlas.get)
        ipcMain.handle(Channels.tilemaps.get, api.tilemaps.get)
        ipcMain.handle(Channels.audio.get, api.audio.get)
    } catch (error) {
        Debug.logger.error(error)
    }
}

start()
