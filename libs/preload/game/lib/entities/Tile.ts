import { Engine } from '@preload/core'
import { Vector2 } from '@shared/helpers'
import { Body, Box } from 'p2'
import { Graphics, Sprite, Spritesheet, Texture } from 'pixi.js'
import { Packer } from 'preload/core'
import { TileCollision } from './TileCollision'

export class Tile {
    public spritesheet: Spritesheet
    public position: Vector2
    public texture: Texture
    public sprite: Sprite
    public box: Box | null = null
    public body: Body | null = null
    public graphics: Graphics | null = null

    public constructor(tile: Packer.TilemapJSON) {
        this.spritesheet = Engine.assets.spritesheets.get(tile.spritesheet)
        this.texture = this.spritesheet.textures[tile.key]
        this.position = Vector2.normalize(new Vector2(tile.x, tile.y))
        this.sprite = new Sprite(this.texture)
        this.sprite.anchor.set(0.5, 0.5)
        this.sprite.position = this.position

        if (tile.collisions) {
            for (const collision of tile.collisions) {
                new TileCollision(collision, this.position)
            }
        }
    }
}
