import { Spritesheet } from 'pixi.js'

export class Prop {
    public spritesheet: Spritesheet

    public constructor(spritesheet: Spritesheet) {
        this.spritesheet = spritesheet
    }
}
