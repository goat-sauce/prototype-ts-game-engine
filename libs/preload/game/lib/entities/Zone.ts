import { Engine } from '@preload/core'
import { config } from '@shared/config'
import { Vector2 } from '@shared/helpers'
import { Body, Circle } from 'p2'
import { Graphics } from 'pixi.js'
import { ZoneOptions } from 'preload/game/types'

export class Zone {
    public radius: number
    public body: Body
    public circle: Circle
    public graphics: Graphics
    public ref?: string

    public constructor(options: ZoneOptions) {
        this.radius = options.radius
        this.graphics = new Graphics()
        this.circle = new Circle({ radius: this.radius })
        this.body = new Body({ mass: 0 })
        this.circle.sensor = true
        this.body.addShape(this.circle)
        if (options.position) this.body.position = Vector2.float32(options.position)
        if (config.debug) this.debug()
        if (options.ref) Engine.registry.bodies.set(this.body.id, options.ref)
        Engine.physics.world.addBody(this.body)
    }

    public debug(): void {
        this.graphics.beginFill(0xff0000)
        this.graphics.zIndex = 1000
        this.graphics.alpha = 0.5
        this.graphics.drawCircle(0, 0, this.radius)
        this.graphics.position = Vector2.convert(this.body.position)
        Engine.layers.stage.container.addChild(this.graphics)
    }
}
