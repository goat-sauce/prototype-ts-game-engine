import { Engine } from '../Engine'
import { Container, Graphics } from 'pixi.js'
import { Vector2 } from '@shared/helpers'
import { GameObject } from '@preload/tasks'

export class Stage {
    public container: Container
    public pointer: Graphics
    public target: GameObject<any> | null

    public constructor() {
        this.container = new Container()
        this.container.position = new Vector2(0, 0)
        this.container.sortableChildren = true
        this.pointer = this.rect()
        this.target = null
    }

    public render(): void {
        if (this.target) this.center(this.target.position)
    }

    public rect(position = new Vector2(0, 0)): Graphics {
        const graphics = new Graphics()
        graphics.beginFill(0xffff00)
        graphics.lineStyle(10, 0xff0000)
        graphics.drawRect(position.x, position.y, 1, 1)
        return graphics
    }

    public center(position: Vector2): void {
        this.container.position.x = -position.x + Engine.renderer.screen.width / 2
        this.container.position.y = -position.y + Engine.renderer.screen.height / 2
    }
}
