import { AnimatedSprite, Spritesheet, BaseTexture } from 'pixi.js'
import { Atlas } from './interface/Atlas'

export class Actor {
    public animation: AnimatedSprite = null
    public spritesheet: Spritesheet

    constructor(atlas: Atlas) {
        this.spritesheet = new Spritesheet(BaseTexture.from(atlas.meta.image), atlas)
    }
}
