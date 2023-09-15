import { Engine } from '@preload/core'
import { config } from '@shared/config'
import { Vector2 } from '@shared/helpers'
import { Body, Circle } from 'p2'
import { Graphics } from 'pixi.js'

export class Zone {
    public radius: number
    public body: Body
    public circle: Circle
    public graphics: Graphics

    public constructor(radius: number, body: Body) {
        this.radius = radius
        this.graphics = new Graphics()
        this.circle = new Circle({ radius: this.radius })
        this.body = new Body({ mass: 0 })
        this.circle.sensor = true
        this.body.position = body.position
        this.body.addShape(this.circle)
        if (config.debug) this.debug()
        Engine.physics.world.addBody(this.body)
    }

    public debug(): void {
        this.graphics.beginFill(0xff0000)
        this.graphics.zIndex = 1000
        this.graphics.alpha = 0.5
        this.graphics.drawCircle(0, 0, this.radius)
        this.graphics.position = Vector2.convert(this.body.position)
        Engine.stage.container.addChild(this.graphics)
    }
}
