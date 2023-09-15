import { ipcRenderer } from 'electron'
import { Assets as AssetsPIXI, Texture } from 'pixi.js'

export class Assets {
    public textures: Texture[]

    public async load() {
        const assets = await ipcRenderer.invoke('assets:get')

        for (const asset of assets) {
            await AssetsPIXI.load(asset)
        }
    }
}
