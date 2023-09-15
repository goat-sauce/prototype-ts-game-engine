import { Vector2 } from "@package/entities"
import { Container, Graphics } from "pixi.js"
import { Client } from "../Client"

export class Stage {
    public container: Container
    public pointer: Graphics

    constructor() {
        this.container = new Container()
        this.pointer = this.rect()
    }

    public rect(position = new Vector2(0, 0)) {
        const graphics = new Graphics()
        graphics.beginFill(0xffff00)
        graphics.lineStyle(10, 0xff0000)
        graphics.drawRect(position.x, position.y, 1, 1)
        return graphics
    }

    public center() {
        const x = Client.Engine.renderer.screen.width / 2;
        const y = Client.Engine.renderer.screen.height / 2;
        return new Vector2(x, y);
    }

    public debug() {
        this.pointer.position = this.center()
        Client.Engine.stage.container.addChild(this.pointer)
    }
}