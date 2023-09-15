import { config } from '@shared/config'
import { Vector2 } from '@shared/helpers'
import { Tiled } from '@preload/core'
import { Collisions } from './Collisions'

export class TileCollision {
    public physics: Collisions.Box | Collisions.Circle | Collisions.Point | Collisions.Polygon
    public collision: Tiled.Object
    public position: Vector2

    public constructor(collision: Tiled.Object, position: Vector2) {
        this.collision = collision
        this.position = this.getPosition(position)
        this.physics = this.getPhysicsFromCollision()
    }

    public getPhysicsFromCollision(): Collisions.Box | Collisions.Circle | Collisions.Point | Collisions.Polygon {
        if (this.collision.ellipse) return new Collisions.Circle(this.collision, this.position)
        if (this.collision.point) return new Collisions.Point(this.collision, this.position)
        if (this.collision.polygon) return new Collisions.Polygon(this.collision, this.position)
        return new Collisions.Box(this.collision, this.position)
    }

    public getPosition(position: Vector2): Vector2 {
        const offsetX = (config.base.size.x - this.collision.width) / 2
        const offsetY = (config.base.size.y - this.collision.height) / 2
        const local0 = new Vector2(position.x - offsetX, position.y - offsetY)
        return new Vector2(local0.x + this.collision.x, local0.y + this.collision.y)
    }
}
