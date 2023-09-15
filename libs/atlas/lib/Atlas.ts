import { Spritesheet } from 'pixi.js'
import { AtlasJSON } from './interfaces/AtlasJSON';
import { ipcRenderer } from 'electron';

export class Atlas {
    public spritesheets: Map<string, Spritesheet> = new Map();
    public list: Record<string, AtlasJSON> = {};

    public async load() {
        const atlases = await ipcRenderer.invoke('atlas:get')
    }
}