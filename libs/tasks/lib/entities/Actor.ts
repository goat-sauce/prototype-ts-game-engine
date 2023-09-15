import { Client } from '@package/core'
import { Vector2 } from '@package/helpers'
import { Spritesheet } from 'pixi.js'
import { Animations } from './Animations'
import { Physics } from './Physics'

export class Actor {
    public spritesheet: Spritesheet
    public animations: Animations
    public physics: Physics

    public constructor(key: string, spawn: Vector2) {
        this.spritesheet = Client.Engine.atlases.spritesheets.get(key)
        this.animations = new Animations(this.spritesheet, spawn)
        this.physics = new Physics(this.animations.active, {
            body: {
                mass: 1,
                fixedRotation: true,
                gravityScale: 0,
                damping: 0.6,
                position: Vector2.float32(Vector2.normalize(spawn))
            },
            box: {
                width: this.animations.active.width,
                height: this.animations.active.height
            }
        })
    }

    public position(position: Vector2): Vector2 {
        this.animations.active.position = position
        this.physics.graphics.position = position
        return position
    }
}
