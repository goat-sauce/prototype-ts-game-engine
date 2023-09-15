import { DisplayObject } from 'pixi.js'
import { HouseState } from 'preload/game/types'
import { GameObject } from '../classes/GameObject'
import { Tilemap } from '../entities/Tilemap'

export class StarterLevel extends GameObject<{}> {
    public tilemap: Tilemap

    public constructor(state: HouseState) {
        super(state)
        this.tilemap = new Tilemap('starter-1')
    }

    public async render(): Promise<DisplayObject> {
        return this.tilemap.container
    }
}
