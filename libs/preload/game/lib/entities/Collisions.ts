import p2 from 'p2'
import { config } from '@shared/config'
import { Engine, Tiled } from '@preload/core'
import { Vector2 } from '@shared/helpers'
import { Graphics } from 'pixi.js'
import { PhysicsOptions } from 'preload/game/types'
import { Debug } from '@shared/debug'

export namespace Collisions {
    export class Polygon {
        public body: p2.Body
        public graphics: Graphics = Debug.graphics.shape()

        public constructor(collision: Tiled.Object, position: Vector2, options?: PhysicsOptions.Polygon) {
            const path = collision.polygon?.map((polygon: Tiled.Polygon) => [polygon.x, polygon.y] as [number, number])
            this.body = options ? new p2.Body(options.body) : new p2.Body()
            this.body.position = Vector2.float32(position)
            if (path) this.body.fromPolygon([...path])
            if (config.debug && collision.polygon) this.debug(collision.polygon)
            if (options) Engine.registry.bodies.set(this.body.id, options.ref)
            Engine.physics.world.addBody(this.body)
        }

        public static getDimensions(polygon: Tiled.Polygon[]): { width: number, height: number } {
            if (polygon) {
                const low = polygon?.reduce((accumulator: Tiled.Polygon, vector: Tiled.Polygon) => {
                    if (vector.x <= accumulator.x) accumulator.x = vector.x
                    if (vector.y <= accumulator.y) accumulator.y = vector.y
                    return accumulator
                }, { x: polygon[0].x, y: polygon[0].y })

                const high = polygon?.reduce((accumulator: Tiled.Polygon, vector: Tiled.Polygon) => {
                    if (vector.x >= accumulator.x) accumulator.x = vector.x
                    if (vector.y >= accumulator.y) accumulator.y = vector.y
                    return accumulator
                }, { x: polygon[0].x, y: polygon[0].y })

                return {
                    width: Math.abs(high.x - low.x),
                    height: Math.abs(high.y - low.y)
                }
            }

            return {
                width: 0,
                height: 0
            }
        }

        public debug(polygon: Tiled.Polygon[]): void {
            const dimensions = Collisions.Polygon.getDimensions(polygon)
            this.graphics.beginFill(0xffff00)
            this.graphics.zIndex = 1000
            this.graphics.drawPolygon(polygon)
            this.graphics.pivot.set(dimensions.width / 2, -dimensions.height / 4)
            this.graphics.position = Vector2.convert(this.body.position)
            Engine.layers.stage.container.addChild(this.graphics)
        }
    }

    export class Point {
        public body: p2.Body
        public box: p2.Box
        public graphics: Graphics = Debug.graphics.shape()

        public constructor(collision: Tiled.Object, position: Vector2, options?: PhysicsOptions.Point) {
            this.body = options ? new p2.Body(options.body) : new p2.Body()
            this.box = options ? new p2.Box(options.point) : new p2.Box({ width: collision.width, height: collision.height })
            this.body.position = Vector2.float32(position)
            this.body.addShape(this.box)
            if (config.debug) this.debug()
            if (options) Engine.registry.bodies.set(this.body.id, options.ref)
            Engine.physics.world.addBody(this.body)
        }

        public debug(): void {
            this.graphics.beginFill(0xffff00)
            this.graphics.zIndex = 1000
            this.graphics.pivot.set(this.box.width / 2, this.box.height / 2)
            this.graphics.drawRect(0, 0, this.box.width, this.box.height)
            this.graphics.position = Vector2.convert(this.body.position)
            Engine.layers.stage.container.addChild(this.graphics)
        }
    }

    export class Circle {
        public body: p2.Body
        public circle: p2.Circle
        public graphics: Graphics = Debug.graphics.shape()

        public constructor(collision: Tiled.Object, position: Vector2, options?: PhysicsOptions.Circle) {
            this.body = options ? new p2.Body(options.body) : new p2.Body()
            this.circle = options ? new p2.Circle(options.circle) : new p2.Circle({ radius: collision.width / 2 })
            this.body.position = Vector2.float32(position)
            this.body.addShape(this.circle)
            if (config.debug) this.debug()
            if (options) Engine.registry.bodies.set(this.body.id, options.ref)
            Engine.physics.world.addBody(this.body)
        }

        public debug(): void {
            this.graphics.beginFill(0xffff00)
            this.graphics.zIndex = 1000
            this.graphics.drawCircle(0, 0, this.circle.radius)
            this.graphics.position = Vector2.convert(this.body.position)
            Engine.layers.stage.container.addChild(this.graphics)
        }
    }

    export class Box {
        public body: p2.Body
        public box: p2.Box
        public graphics: Graphics = Debug.graphics.shape()

        public constructor(collision: Tiled.Object, position: Vector2, options?: PhysicsOptions.Box) {
            this.body = options ? new p2.Body(options.body) : new p2.Body()
            this.box = options ? new p2.Box(options.box) : new p2.Box({ width: collision.width, height: collision.height })
            this.body.position = Vector2.float32(position)
            this.body.addShape(this.box)
            if (config.debug) this.debug()
            if (options) Engine.registry.bodies.set(this.body.id, options.ref)
            Engine.physics.world.addBody(this.body)
        }

        public debug(): void {
            this.graphics.beginFill(0xffff00)
            this.graphics.zIndex = 1000
            this.graphics.pivot.set(this.box.width / 2, this.box.height / 2)
            this.graphics.drawRect(0, 0, this.box.width, this.box.height)
            this.graphics.position = Vector2.convert(this.body.position)
            Engine.layers.stage.container.addChild(this.graphics)
        }
    }
}
