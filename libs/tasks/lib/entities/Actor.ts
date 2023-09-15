import { Client } from '@package/core'
import { Vector2 } from '@package/helpers'
import { Body, Box } from 'p2'
import { AnimatedSprite, Graphics, Spritesheet } from 'pixi.js'

export class Actor {
    public spritesheet: Spritesheet
    public animations: Record<string, AnimatedSprite> = {}
    public animation: AnimatedSprite
    public body: Body = new Body({ mass: 0, position: [0, 0] })
    public box: Box = new Box({ width: 1, height: 1 })
    public graphics: Graphics = new Graphics();

    public constructor(key: string, spawn: Vector2) {
        this.spritesheet = Client.Engine.atlases.spritesheets.get(key)
        this.animations = this.getAnimations(this.spritesheet)
        this.animation = this.animations['idle']
        this.animation.anchor.set(0.5, 0.5)
        // this.animation.pivot.set(this.animation.height / 2, this.animation.height / 2)
        this.enablePhysics(spawn)
        this.graphics = new Graphics()
        this.graphics.beginFill(0xffff00)
        this.graphics.drawRect(0, 0, this.box.width, this.box.height)
        this.graphics.pivot.set(this.box.width / 2, this.box.height / 2)
        this.graphics.zIndex = 100
        this.position(Vector2.convert(this.body.position, true))
        // Client.Engine.stage.container.addChild(this.graphics)
        Client.Engine.physics.world.addBody(this.body)
    }

    public enablePhysics(spawn: Vector2): void {
        this.body = new Body({ mass: 1, fixedRotation: true, damping: 0.2, position: Vector2.float32(spawn) })
        this.box = new Box({ width: this.animation.width, height: this.animation.height, collisionGroup: 1 })
        this.body.addShape(this.box)
    }

    public position(position: Vector2): void {
        this.animation.position = position
        this.graphics.position = position
    }

    public getAnimations(spritesheet: Spritesheet): Record<string, AnimatedSprite> {
        const sprites: Record<string, AnimatedSprite> = {}

        for (const [key, animation] of Object.entries(spritesheet.animations)) {
            sprites[key] = new AnimatedSprite(animation)
        }

        return sprites
    }

    public setAnimation(key: string): void {
        for (const animation of Object.values(this.animations)) {
            animation.visible = false
        }

        this.box.width = this.animation.width
        this.box.height = this.animation.height
        this.animation = this.animations[key]
        this.animation.anchor.set(0.5, 0.5)
        // this.animation.pivot.set(this.animation.height / 2, this.animation.height / 2)
        this.animation.visible = true
    }
}
