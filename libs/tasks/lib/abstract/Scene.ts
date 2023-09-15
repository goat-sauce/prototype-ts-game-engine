import { Client } from '@package/core'
import { v4 as uuidv4 } from 'uuid'

export class Scene {
    public ref: string = uuidv4()

    public destroy(): void {
        Client.Engine.ticker.stop()
        Client.Engine.stage.container.destroy()
        Client.Engine.physics.world.clear()
        Client.Engine.renderer.clear()
    }
}
