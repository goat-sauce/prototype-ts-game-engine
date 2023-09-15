import { Client } from '@package/core'
import { TilemapJSON } from 'core/types'
import { Container } from 'pixi.js'
import { Tile } from './Tile'

export class Tilemap {
    public data: TilemapJSON[][] = []
    public container: Container = new Container()

    public constructor(key: string) {
        this.data = Client.Engine.tilemaps.data[key]
        this.create()
    }

    public create(): void {
        for (const [index, layer] of this.data.entries()) {
            const container = new Container()

            for (const tile of layer) {
                const current = new Tile(tile)
                if (current.sprite) container.addChild(current.sprite)
            }

            container.zIndex = index
            this.container.addChild(container)
        }
    }
}
