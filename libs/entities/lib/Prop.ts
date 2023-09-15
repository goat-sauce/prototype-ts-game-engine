import { Spritesheet, BaseTexture, Sprite } from 'pixi.js'
import { Atlas } from './interface/Atlas'

export class Prop {
    public spritesheet: Spritesheet
    public sprite: Sprite

    constructor(atlas: Atlas) {
        this.spritesheet = new Spritesheet(BaseTexture.from(atlas.meta.image), atlas)
        this.sprite = new Sprite()
    }
}
