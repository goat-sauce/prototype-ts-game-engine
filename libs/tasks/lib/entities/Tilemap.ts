import { Client } from '@package/core'
import { TilemapJSON } from 'core/types'
import { Vector2 } from '@package/helpers'
import { Container, Sprite } from 'pixi.js'

export class Tilemap {
    public data: TilemapJSON[][] = []
    public container: Container = new Container()

    public constructor(key: string) {
        this.data = Client.Engine.tilemaps.data[key]
        this.create()
    }

    public create(): void {
        for (const [index, tiles] of this.data.entries()) {
            const container = new Container()

            for (const tile of tiles) {
                const spritesheet = Client.Engine.atlases.spritesheets.get(tile.key.split('-')[0])
                const position = new Vector2(tile.x, tile.y)
                const texture = spritesheet.textures[tile.key];
                const sprite = new Sprite(texture)
                sprite.position = Vector2.normalize(position)
                container.addChild(sprite)

                if (tile.key.includes('house')) {
                    console.log(tile, position, texture, spritesheet)
                }
            }

            container.zIndex = index

            this.container.addChild(container)
        }
    }
}
