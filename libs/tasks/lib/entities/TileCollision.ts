import { config } from '@package/config'
import { Vector2 } from '@package/helpers'
import { Collision } from 'core/types'
import { Sprite } from 'pixi.js'
import { Physics } from './Physics'

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
