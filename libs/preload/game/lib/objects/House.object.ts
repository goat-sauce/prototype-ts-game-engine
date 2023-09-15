import { DisplayObject } from 'pixi.js'
import { HouseState } from 'preload/game/types'
import { GameObject } from '../classes/GameObject'
import { Tilemap } from '../entities/Tilemap'

export class House extends GameObject<HouseState> {
    public tilemap: Tilemap

    public constructor(state: HouseState) {
        super(state)
        this.tilemap = new Tilemap('test-area')
    }

    public async render(): Promise<DisplayObject> {
        return this.tilemap.container
    }
}
