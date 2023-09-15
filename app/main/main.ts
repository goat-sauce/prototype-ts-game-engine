import { Debug } from '@package/debug'
import { app, ipcMain } from 'electron'
import { API } from './api'

async function start(): Promise<void> {
    try {
        const api = new API()
        await app.whenReady()
        api.window.create()
        ipcMain.handle('game:create', api.game.create)
        ipcMain.handle('assets:get', api.assets.get)
        ipcMain.handle('atlas:get', api.atlas.get)
        ipcMain.handle('tilemaps:get', api.tilemaps.get)
    } catch (error) {
        Debug.logger.error(error)
    }
}

start()
