import { Client } from '@package/core';
import { Vector2 } from '@package/helpers';
import { TilemapJSON } from 'core/types';
import { Body, Box } from 'p2';
import { Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import { TileCollision } from './TileCollision';

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
