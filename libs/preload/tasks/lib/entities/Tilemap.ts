import { Engine } from '@preload/core'
import { Container } from 'pixi.js'
import { TilemapJSON } from 'preload/core/types'
import { Tile } from './Tile'

export class Tilemap {
    public data: TilemapJSON[][] = []
    public container: Container = new Container()

    public constructor(key: string) {
        this.data = Engine.assets.tilemaps.data[key]
        this.create()
    }

    public create(): void {
        for (const [index, layer] of this.data.entries()) {
            const container = new Container()

            for (const tile of layer) {
                const current = new Tile(tile)
                if (current.sprite) container.addChild(current.sprite)
            }

            container.sortableChildren = true
            container.zIndex = index
            this.container.addChild(container)
        }
    }
}
