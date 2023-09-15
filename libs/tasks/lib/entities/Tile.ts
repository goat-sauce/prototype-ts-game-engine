import { config } from '@package/config';
import { Client } from '@package/core';
import { Vector2 } from '@package/helpers';
import { Collision, TilemapJSON } from 'core/types';
import { Body, Box } from 'p2';
import { Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import { Physics } from './Physics';

export class Tile {
    public spritesheet: Spritesheet;
    public position: Vector2
    public texture: Texture
    public sprite: Sprite
    public box: Box | null = null
    public body: Body | null = null
    public graphics: Graphics | null = null

    public constructor(tile: TilemapJSON) {
        this.spritesheet = Client.Engine.atlases.spritesheets.get(tile.spritesheet)
        this.texture = this.spritesheet.textures[tile.key];
        this.position = Vector2.normalize(new Vector2(tile.x, tile.y))
        this.sprite = new Sprite(this.texture)
        this.sprite.anchor.set(0.5, 0.5)
        this.sprite.position = this.position

        if (tile.collisions) {
            for (const collision of tile.collisions) {
                new TileCollision(this.sprite, collision, this.position)
            }
        }
    }
}

export class TileCollision {
    public physics: Physics
    private sprite: Sprite
    public collision: Collision
    public position: Vector2

    public constructor(sprite: Sprite, collision: Collision, position: Vector2) {
        this.sprite = sprite
        this.collision = collision
        this.position = this.getPosition(position)
        this.physics = new Physics(this.sprite, {
            body: {
                position: Vector2.float32(this.position),
                mass: 0
            },
            box: {
                width: this.collision.width,
                height: this.collision.height
            }
        }, true)
    }

    public getPosition(position: Vector2): Vector2 {
        const offsetX = (config.base.size.x - this.collision.width) / 2
        const offsetY = (config.base.size.y - this.collision.height) / 2
        const local0 = new Vector2(position.x - offsetX, position.y - offsetY)
        return new Vector2(local0.x + this.collision.x, local0.y + this.collision.y)
    }
}


