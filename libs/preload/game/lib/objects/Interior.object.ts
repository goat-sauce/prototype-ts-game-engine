import { DisplayObject } from 'pixi.js'
import { GameObject } from '../classes/GameObject'
import { Tilemap } from '../entities/Tilemap'

type InteriorState = {}

export class Interior extends GameObject<InteriorState> {
    public tilemap: Tilemap

    public constructor(state: InteriorState) {
        super(state)
        this.tilemap = new Tilemap('interior-1')
    }

    public async render(): Promise<DisplayObject> {
        return this.tilemap.container
    }
}
