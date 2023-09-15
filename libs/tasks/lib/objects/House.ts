import { DisplayObject } from 'pixi.js'
import { Task } from '../abstract/Task'
import { HouseState } from 'tasks/types'
import { Tilemap } from '../entities/Tilemap'
// import { Client } from '@package/core'

export class House extends Task<HouseState> {
    public tilemap: Tilemap

    public constructor(state: HouseState) {
        super(state)
        this.tilemap = new Tilemap('test-area')
    }

    public async render(): Promise<DisplayObject> {
        return this.tilemap.container
    }
}
