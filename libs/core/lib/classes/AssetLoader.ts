import { ipcRenderer } from 'electron'
import { Assets as AssetsPIXI, Texture } from 'pixi.js'

export class Assets {
    public textures: Texture[]
    public async load() {
        const assets = await ipcRenderer.invoke('game:assets')

        for (const asset of assets) {
            // const atlas = await import(`../../../../build/${asset}`)
            // console.log(atlas)
        }

        // const spritesheets = [];
        // console.log(textures)

        // Object.keys(textures).reduce((acc: Record<string, Texture>, key: string) => {
        //     const parts = key.split('\\').reverse();
        //     const filename = [];
        //     for (const part of parts) {
        //         if (part.includes('sprites')) break;
        //         filename.push(part);
        //     }

        //     console.log(filename.reverse().join('-').toLowerCase())

        //     acc[key] = textures[key]
        //     return acc
        // }, {})

        // this.textures = textures
    }
}
