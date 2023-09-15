import { DisplayObject } from 'pixi.js'
import { GameObject } from '../classes/GameObject'
import { Tilemap } from '../entities/Tilemap'

type CollisionsTestState = {}

export class CollisionsTest extends GameObject<CollisionsTestState> {
    public tilemap: Tilemap
    public constructor(state: CollisionsTestState) {
        super(state)
        this.tilemap = new Tilemap('collisions-test')
    }

    public async render(): Promise<DisplayObject> {
        return this.tilemap.container
    }
}
