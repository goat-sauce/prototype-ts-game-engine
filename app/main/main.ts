import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1280,
        height: 720,
        minHeight: 360,
        minWidth: 640,
        useContentSize: true,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, 'preload.bundle.js'),
            nodeIntegrationInWorker: true
        },
    })

    window.webContents.openDevTools()
    window.loadFile(join(__dirname, 'renderer.html'))
}

app.whenReady().then(() => createWindow())