import { DisplayObject } from 'pixi.js'
import { Task } from '../abstract/Task'
import { HouseState } from 'tasks/types'
import { Tilemap } from '../entities/Tilemap'
import { Vector2 } from '@package/helpers'
// import { Client } from '@package/core'

export class House extends Task<HouseState> {
    public tilemap: Tilemap

    public constructor(state: HouseState) {
        super(state)
        this.tilemap = new Tilemap('test-area')
    }

    public async render(): Promise<DisplayObject> {
        for (const tile of this.tilemap.tiles) {
            if (tile.graphics && tile.body) {
                // tile.sprite.position = Vector2.convert(tile.body.position, true)
                // tile.graphics.position = Vector2.convert(tile.body.position, true)
            }
        }

        return this.tilemap.container
    }
}
