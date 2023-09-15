import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { Vector2 } from '@package/utils'
import { Chunk } from './classes/Chunk'
import { config } from '@package/config'
import { writeFile } from 'fs/promises'

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
        }
    })

    window.webContents.openDevTools()
    window.loadFile(join(__dirname, 'renderer.html'))
}

async function handleGameCreate(event, data: any) {
    // const webContents = event.sender
    // const win = BrowserWindow.fromWebContents(webContents)
    const size = config.world.size / config.chunk.size;
    const chunks: Chunk[] = [];

    for (let chunk = 0; chunk < size; chunk++) {
        chunks.push(new Chunk(chunk, new Vector2(config.chunk.size * chunk, config.chunk.size * chunk)))
    }

    for (const chunk of chunks) {
        console.log([...chunk.nodes][0])
    }

    await writeFile(`data/world.json`, JSON.stringify(chunks, (key, value) => {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), // or with spread: value: [...value]
            };
        } else {
            return value;
        }
    }, 4))

    return chunks
}

(async () => {
    await app.whenReady()
    createWindow();
    ipcMain.handle('test', handleGameCreate)
})();