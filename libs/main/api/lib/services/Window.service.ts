import { config } from '@shared/config'
import { Debug } from '@shared/debug'
import { BrowserWindow } from 'electron'
import { join } from 'path'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'

export class WindowService extends Service {
    public async create(): Promise<void> {
        try {
            const window = new BrowserWindow({
                width: config.window.size.x,
                height: config.window.size.y,
                useContentSize: true,
                autoHideMenuBar: true,
                webPreferences: {
                    preload: join(__dirname, 'preload.bundle.js'),
                    nodeIntegrationInWorker: true
                }
            })

            window.webContents.openDevTools()
            await window.loadFile(join(__dirname, 'renderer.html'))
        } catch (error) {
            Debug.logger.error(Errors.FailedWindowService, error)
        }
    }
}
