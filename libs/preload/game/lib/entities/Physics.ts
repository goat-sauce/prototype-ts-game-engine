import { config } from '@shared/config'
import { Engine } from '@preload/core'
import { Vector2 } from '@shared/helpers'
import { Body, Box } from 'p2'
import { AnimatedSprite, Graphics, Sprite } from 'pixi.js'
import { PhysicsOptions } from 'preload/game/types'
import { Zone } from './Zone'

export class Physics {
    public body: Body
    public box: Box
    public sprite: Sprite | AnimatedSprite
    public graphics: Graphics = new Graphics()
    public options: PhysicsOptions
    public zone?: Zone

    public constructor(sprite: Sprite | AnimatedSprite, options: PhysicsOptions) {
        this.sprite = sprite
        this.options = options
        this.body = new Body(this.options.body)
        this.box = new Box(this.options.box)
        this.body.addShape(this.box)

        if (config.debug) this.debug()

        if (options.zone) {
            this.zone = new Zone({
                radius: options.zone.radius,
                position: Vector2.convert(this.body.position),
                ref: options.ref
            })
        }

        if (options.ref && !options.zone) {
            Engine.registry.bodies.set(this.body.id, options.ref)
        }

        Engine.physics.world.addBody(this.body)
    }

    public debug(): void {
        this.graphics = new Graphics()
        this.graphics.beginFill(0xffff00)
        this.graphics.zIndex = 1000
        this.graphics.pivot.set(this.box.width / 2, this.box.height / 2)
        this.graphics.drawRect(0, 0, this.box.width, this.box.height)
        this.graphics.position = Vector2.convert(this.body.position)
        Engine.layers.stage.container.addChild(this.graphics)
    }
}
