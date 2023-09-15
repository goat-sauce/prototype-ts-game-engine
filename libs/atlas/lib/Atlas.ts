import { BaseTexture, Spritesheet } from 'pixi.js'
import { AtlasJSON } from './interfaces/AtlasJSON';
import { ipcRenderer } from 'electron';

export class Atlas {
    public spritesheets: Map<string, Spritesheet> = new Map();
    public list: Record<string, AtlasJSON> = {};

    public async load() {
        this.list = await ipcRenderer.invoke('atlas:get')

        for (const [key, atlas] of Object.entries(this.list)) {
            const spritesheet = new Spritesheet(BaseTexture.from(atlas.meta.image), atlas)
            await spritesheet.parse()
            this.spritesheets.set(key, spritesheet)
        }

        console.log(this.spritesheets, 'spritesheets')
    }
}