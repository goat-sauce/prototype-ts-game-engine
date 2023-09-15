import { Debug } from '@package/debug'
import { app, ipcMain } from 'electron'
import { API } from './api'

async function start() {
    try {
        const api = new API();
        await app.whenReady()
        api.window.create()
        ipcMain.handle('game:create', api.game.create)
        ipcMain.handle('assets:get', api.assets.get)
        ipcMain.handle('atlas:get', api.atlas.get)
        ipcMain.handle('chunk:get', api.chunk.get)
    } catch (error) {
        Debug.Logger.error(error)
    }
}

start()
