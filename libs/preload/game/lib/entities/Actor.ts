import { Engine } from '@preload/core'
import { Vector2 } from '@shared/helpers'
import { Spritesheet } from 'pixi.js'
import { ActorOptions } from 'preload/game/types'
import { Animations } from './Animations'
import { Physics } from './Physics'

export class Actor {
    public spritesheet: Spritesheet
    public animations: Animations
    public physics: Physics

    public constructor(options: ActorOptions) {
        this.spritesheet = Engine.assets.spritesheets.get(options.spritesheet)
        this.animations = new Animations(this.spritesheet, options.spawn, options.animation)
        this.physics = new Physics(this.animations.current, {
            zone: options.zone,
            ref: options.ref,
            body: {
                mass: options.static ? 0 : 1,
                fixedRotation: true,
                gravityScale: 0,
                damping: 0.99,
                position: Vector2.float32(Vector2.normalize(options.spawn))
            },
            box: {
                width: this.animations.current.width,
                height: this.animations.current.height
            }
        })
    }

    public position(position: Vector2): Vector2 {
        this.animations.current.position = position
        this.physics.graphics.position = position

        if (this.physics.zone) {
            this.physics.zone.body.position = Vector2.float32(position)
            this.physics.zone.graphics.position = position
        }

        return position
    }
}
