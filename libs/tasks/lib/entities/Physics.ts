import { config } from '@package/config';
import { Client } from '@package/core';
import { Vector2 } from '@package/helpers';
import { Body, BodyOptions, Box, BoxOptions } from 'p2';
import { AnimatedSprite, Graphics, Sprite } from 'pixi.js';

type PhysicsOptions = {
    position?: Vector2,
    body: BodyOptions,
    box: BoxOptions
}

export class Physics {
    public body: Body
    public box: Box
    public sprite: Sprite | AnimatedSprite
    public graphics: Graphics = new Graphics()
    public options: PhysicsOptions
    public isTileCollision: boolean

    public constructor(sprite: Sprite | AnimatedSprite, options: PhysicsOptions, isTIleCollision = false) {
        this.sprite = sprite;
        this.options = options
        this.body = new Body(this.options.body)
        this.box = new Box(this.options.box)
        this.isTileCollision = isTIleCollision
        this.body.addShape(this.box)
        if (config.debug) this.debug()
        Client.Engine.physics.world.addBody(this.body)
    }

    public load(): void {

    }

    public debug(): void {
        this.graphics = new Graphics()
        this.graphics.beginFill(0xffff00)
        this.graphics.zIndex = 1000
        this.graphics.pivot.set(this.box.width / 2, this.box.height / 2)
        this.graphics.drawRect(0, 0, this.box.width, this.box.height)
        this.graphics.position = Vector2.convert(this.body.position)
        Client.Engine.stage.container.addChild(this.graphics)
    }
}
