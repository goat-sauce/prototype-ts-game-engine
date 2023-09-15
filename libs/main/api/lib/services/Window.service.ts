import { config } from '@shared/config'
import { BrowserWindow } from 'electron'
import { join } from 'path'
import { Service } from './abstract/Service'

export class WindowService extends Service {
    public create(): void {
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
        window.loadFile(join(__dirname, 'renderer.html'))
    }
}
