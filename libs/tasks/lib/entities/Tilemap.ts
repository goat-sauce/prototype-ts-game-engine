import { Client } from '@package/core'
import { TilemapJSON } from 'core/types'
import { Vector2 } from '@package/helpers'
import { Container, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js'
import { Body, Box } from 'p2'
import { config } from '@package/config'

export class Tile {
    public spritesheet: Spritesheet;
    public position: Vector2
    public texture: Texture
    public sprite: Sprite
    public box: Box | null = null
    public body: Body | null = null
    public graphics: Graphics | null = null

    public constructor(tile: TilemapJSON) {
        this.spritesheet = Client.Engine.atlases.spritesheets.get(tile.key.split('-')[0])
        console.log(tile.x, tile.y)
        this.position = new Vector2(tile.x, tile.y)
        this.texture = this.spritesheet.textures[tile.key];
        this.sprite = new Sprite(this.texture)
        this.sprite.anchor.set(0.5, 0.5)
        this.sprite.position = Vector2.normalize(this.position)
        // this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2)

        if (tile.collisions) {
            const world = Vector2.normalize(this.position)

            for (const collision of tile.collisions) {


                const dum = (64 - collision.width) / 2
                const dum2 = (64 - collision.height) / 2
                const dum3 = new Vector2(world.x - dum, world.y - dum2)
                const physics = new Vector2(dum3.x + collision.x, dum3.y + collision.y)
                this.body = new Body({ mass: 0, position: [physics.x, physics.y] })
                this.box = new Box({ width: collision.width, height: collision.height })
                this.body.addShape(this.box)
                Client.Engine.physics.world.addBody(this.body)

                if (this.box) {
                    this.graphics = new Graphics()
                    this.graphics.beginFill(0xffff00)
                    this.graphics.drawRect(physics.x, physics.y, this.box.width, this.box.height)
                    this.graphics.zIndex = 100;
                    this.graphics.pivot.set(this.box.width / 2, this.box.height / 2)
                    // Client.Engine.stage.container.addChild(this.graphics)
                }
            }
        }
    }
}

export class Tilemap {
    public data: TilemapJSON[][] = []
    public container: Container = new Container()
    public tiles: Tile[] = []

    public constructor(key: string) {
        this.data = Client.Engine.tilemaps.data[key]
        this.create()
    }

    public create(): void {
        for (const [index, layers] of this.data.entries()) {
            const container = new Container()

            for (const tile of layers) {
                // if (tile.x === 11 && tile.y === 5 || tile.x === 11 && tile.y === 4 || tile.x === 13 && tile.y === 5 || tile.x === 13 && tile.y === 4) {
                // if (tile.x === 11 && tile.y === 5) {
                const current = new Tile(tile)
                this.tiles.push(current)
                if (current.sprite) container.addChild(current.sprite)
                // }
            }

            container.zIndex = index

            this.container.addChild(container)
        }
    }
}
