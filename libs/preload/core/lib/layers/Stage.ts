import { GameObject } from '@preload/game'
import { Vector2 } from '@shared/helpers'
import { Container } from 'pixi.js'
import { Engine } from '../Engine'

export class Stage {
    public container: Container
    public target: GameObject<any> | null

    public constructor(zIndex?: number) {
        this.container = new Container()
        this.container.zIndex = zIndex ? zIndex : 0
        this.container.position = new Vector2(0, 0)
        this.container.sortableChildren = true
        this.target = null
    }

    public render(): void {
        if (this.target) this.center(this.target.position)
    }

    public center(position: Vector2, offset?: number): void {
        this.container.position.x = -position.x + Engine.renderer.screen.width / 2 + (offset ? offset : 0)
        this.container.position.y = -position.y + Engine.renderer.screen.height / 2 + (offset ? offset : 0)
    }
}
