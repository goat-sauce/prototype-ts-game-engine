import { Client } from '@package/core'
import { Spritesheet } from 'pixi.js'

export class Actor {
    // public spritesheet: Spritesheet

    constructor(key: string) {
        // this is causing a bug when turned on, not sure why? 
        // this.spritesheet = Client.Engine.atlases.spritesheets.get(key)
    }
}
