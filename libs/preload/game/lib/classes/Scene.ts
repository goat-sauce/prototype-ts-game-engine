import { Engine } from '@preload/core'
import { Memory } from '@shared/memory'
import { v4 as uuidv4 } from 'uuid'
import { GameObject } from './GameObject'

export class Scene {
    public ref: string = uuidv4()
    public gameObjects: Record<string, GameObject<any>> = {}

    public destroy(): void {
        Engine.physics.world.clear()
        Engine.renderer.clear()
        Engine.layers.stage.container.removeChildren(0, Engine.layers.stage.container.children.length)
        Engine.registry.gameObjects = new Memory()
    }

    public start(): void {
        Engine.ticker.add(() => Engine.render())
        Engine.ticker.start()
    }

    public load(target?: GameObject<any>): void {
        if (target) Engine.layers.stage.target = target
        Engine.runner.setup([...Object.values(this.gameObjects)])
    }
}
