import { app, ipcMain } from 'electron'
import { api } from './api';

(async () => {
    await app.whenReady()
    api.window.create()
    ipcMain.handle('game:create', api.game.create)
    ipcMain.handle('assets:get', api.assets.get)
})()
