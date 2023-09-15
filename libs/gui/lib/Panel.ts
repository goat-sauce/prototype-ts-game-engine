import { Client } from '@package/core'
import { Vector2 } from '@package/helpers'
import { Container, Graphics } from 'pixi.js'

export class Panel {
    public container: Container = new Container()

    public constructor() {
        const panel = this.rect(new Vector2(Client.Engine.renderer.screen.width - 128, Client.Engine.renderer.screen.height - 128))
        const close = this.rect(new Vector2(32, 32))
        close.interactive = true
        close.position.x = panel.width - close.width
        close.on('click', () => {
            this.container.destroy()
            this.container = new Container()
        })

        this.container.addChild(panel, close)
    }

    public rect(position: Vector2): Graphics {
        const graphics = new Graphics()
        graphics.beginFill(0xffff00)
        graphics.lineStyle(1, 0xff0000)
        graphics.drawRect(0, 0, position.x, position.y)
        return graphics
    }
}
