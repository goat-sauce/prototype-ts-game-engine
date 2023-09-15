import atlas from '../../../build/assets/spritesheets/props/farm/atlas.json'
import { Prop } from 'entities'
import { Task } from './abstract/Task'
import { Container, Sprite, Spritesheet } from 'pixi.js'
import { Vector2 } from '@package/entities'
import { config } from '@package/config'

export class Farm extends Task {
    public override async complete() {
        const container = new Container()
        const farm = new Prop(atlas)
        const position = new Vector2(3, 3)

        await farm.spritesheet.parse()

        const tiles = [
            this.createTile(farm.spritesheet, 0, new Vector2(0, 0)),
            this.createTile(farm.spritesheet, 1, new Vector2(1, 0)),
            this.createTile(farm.spritesheet, 2, new Vector2(2, 0)),
            this.createTile(farm.spritesheet, 3, new Vector2(0, 1)),
            this.createTile(farm.spritesheet, 4, new Vector2(1, 1)),
            this.createTile(farm.spritesheet, 5, new Vector2(2, 1)),
            this.createTile(farm.spritesheet, 6, new Vector2(0, 2)),
            this.createTile(farm.spritesheet, 7, new Vector2(1, 2)),
            this.createTile(farm.spritesheet, 8, new Vector2(2, 2))
        ]

        for (const tile of tiles) {
            container.addChild(tile)
        }

        container.position.x = config.baseUnit * position.x
        container.position.y = config.baseUnit * position.y

        return container
    }

    createTile(spritesheet: Spritesheet, index: number, position: Vector2) {
        const tile = new Sprite(spritesheet.textures[`farm-${index}`])
        tile.position = new Vector2(position.x * config.baseUnit, position.y * config.baseUnit)
        return tile
    }
}
