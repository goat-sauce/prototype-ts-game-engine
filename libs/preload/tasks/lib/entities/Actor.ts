import { Engine } from '@preload/core'
import { Vector2 } from '@shared/helpers'
import { Spritesheet } from 'pixi.js'
import { ActorOptions } from 'preload/tasks/types'
import { Animations } from './Animations'
import { Physics } from './Physics'

export class Actor {
    public spritesheet: Spritesheet
    public animations: Animations
    public physics: Physics

    public constructor(options: ActorOptions) {
        this.spritesheet = Engine.assets.spritesheets.get(options.spritesheet)
        this.animations = new Animations(this.spritesheet, options.spawn)
        this.physics = new Physics(this.animations.active, {
            body: {
                mass: options.static ? 0 : 1,
                fixedRotation: true,
                gravityScale: 0,
                damping: 0.9,
                position: Vector2.float32(Vector2.normalize(options.spawn))
            },
            box: {
                width: this.animations.active.width,
                height: this.animations.active.height
            },
            zone: options.zone
        })
    }

    public position(position: Vector2): Vector2 {
        this.animations.active.position = position
        this.physics.graphics.position = position

        if (this.physics.zone) {
            this.physics.zone.body.position = Vector2.float32(position)
            this.physics.zone.graphics.position = position
        }

        return position
    }
}
