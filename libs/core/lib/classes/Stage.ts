import { Client } from '../Client'
import { Container, Graphics } from 'pixi.js'
import { Vector2 } from '@package/helpers'

export class Stage {
    public container: Container
    public pointer: Graphics

    public constructor() {
        this.container = new Container()
        this.pointer = this.rect()
    }

    public rect(position = new Vector2(0, 0)): Graphics {
        const graphics = new Graphics()
        graphics.beginFill(0xffff00)
        graphics.lineStyle(10, 0xff0000)
        graphics.drawRect(position.x, position.y, 1, 1)
        return graphics
    }

    public center(): Vector2 {
        const x = Client.Engine.renderer.screen.width / 2
        const y = Client.Engine.renderer.screen.height / 2
        return new Vector2(x, y)
    }

    public debug(): void {
        this.pointer.position = this.center()
        Client.Engine.stage.container.addChild(this.pointer)
    }
}
