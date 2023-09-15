import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, 'preload.bundle.js'),
        },
    })

    win.loadFile('build/index.html')
}

app.whenReady().then(() => {
    createWindow()
})