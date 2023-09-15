import { Engine, GeneratedKeys } from '@preload/core'
import { Spritesheet } from 'pixi.js'
import { GameObject } from '../classes/GameObject'

type ToolbarState = {

}

type BuildIconState = {

}

export class BuildIcon extends GameObject<BuildIconState> {
    public spritesheet: Spritesheet = Engine.assets.spritesheets.get(GeneratedKeys.Spritesheets['gold'])

    public constructor(state: BuildIconState) {
        super(state)
        this.spritesheet
    }
}

export class Toolbar extends GameObject<ToolbarState> {
    public buildIcon: BuildIcon = new BuildIcon({})

    public constructor(state: ToolbarState) {
        super(state)
    }

    // public async render(): Promise<DisplayObject> {
    //     return this.
    // }
}
