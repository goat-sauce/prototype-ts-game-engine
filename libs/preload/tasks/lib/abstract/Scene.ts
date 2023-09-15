import { Engine } from '@preload/core'
import { v4 as uuidv4 } from 'uuid'
import { GameObject } from './GameObject'

export class Scene {
    public ref: string = uuidv4()
    public tasks: Record<string, GameObject<any>> = {}

    public destroy(): void {
        Engine.ticker.stop()
        Engine.stage.container.destroy()
        Engine.physics.world.clear()
        Engine.renderer.clear()
    }

    public load(): void {
        Engine.stage.center(this.tasks.player.position)
        Engine.stage.target = this.tasks.player
        Engine.runner.setup([...Object.values(this.tasks)])
        Engine.ticker.add(() => Engine.render())
        Engine.ticker.start()
    }
}
