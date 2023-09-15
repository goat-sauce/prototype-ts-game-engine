import { Engine } from '@preload/core'
import { v4 as uuidv4 } from 'uuid'
import { GameObject } from './GameObject'

export class Scene {
    public ref: string = uuidv4()
    public gameObjects: Record<string, GameObject<any>> = {}

    public destroy(): void {
        Engine.ticker.stop()
        Engine.layers.stage.container.destroy()
        Engine.physics.world.clear()
        Engine.renderer.clear()
    }

    public load(target?: GameObject<any>): void {
        if (target) Engine.layers.stage.target = target
        Engine.runner.setup([...Object.values(this.gameObjects)])
        Engine.ticker.add(() => Engine.render())
        Engine.ticker.start()
    }
}
